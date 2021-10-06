import { Transaction, TransactionVin, TransactionVout } from '@defichain/whale-api-client/dist/api/transactions'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { AdaptiveList } from '@components/commons/AdaptiveList'
import { Link } from '@components/commons/Link'
import { format, fromUnixTime } from 'date-fns'
import BigNumber from 'bignumber.js'

export function TransactionSummaryTable (props: { transaction: Transaction, vins: TransactionVin[], vouts: TransactionVout[], fee: BigNumber }): JSX.Element {
  const transaction = props.transaction
  const vins = props.vins
  const vouts = props.vouts
  const fee = props.fee

  return (
    <div className='mt-5 flex flex-col space-y-6 items-start lg:flex-row lg:space-x-8 lg:space-y-0'>
      <SummaryTableListLeft transaction={transaction} vins={vins} vouts={vouts} fee={fee} />
      <SummaryTableListRight transaction={transaction} vins={vins} vouts={vouts} fee={fee} />
    </div>
  )
}

function SummaryTableListLeft (props: { transaction: Transaction, vins: TransactionVin[], vouts: TransactionVout[], fee: BigNumber }): JSX.Element {
  const { count: { blocks } } = useSelector((state: RootState) => state.stats)
  const confirmations = blocks !== undefined ? blocks - props.transaction.block.height : blocks
  const fee = props.vins[0].vout === undefined ? 'Coinbase' : `${props.fee.decimalPlaces(8).toString()} mDFI`

  return (
    <AdaptiveList className='w-full lg:w-1/2'>
      <AdaptiveList.Row name='Total Amount' testId='transaction-detail-total-amount'>
        {props.transaction.totalVoutValue} DFI
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Fee' testId='transaction-detail-fee'>
        {fee}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Confirmations' testId='transaction-detail-confirmations'>
        {confirmations}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Block Height'>
        <Link href={{ pathname: `/blocks/${props.transaction.block.height}` }}>
          <a className='cursor-pointer hover:text-primary-500' data-testid='transaction-detail-block-height'>
            {props.transaction.block.height}
          </a>
        </Link>
      </AdaptiveList.Row>
    </AdaptiveList>
  )
}

function SummaryTableListRight (props: { transaction: Transaction, vins: TransactionVin[], vouts: TransactionVout[], fee: BigNumber }): JSX.Element {
  const blockTime = format(fromUnixTime(props.transaction.block.medianTime), 'PPpp')

  return (
    <AdaptiveList className='w-full lg:w-1/2'>
      <AdaptiveList.Row name='Fee Rate' testId='transaction-detail-fee-rate'>
        {props.vins[0].vout === undefined ? 'Coinbase' : `${props.fee.decimalPlaces(8).toString()} mDFI/byte`}
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Size' testId='transaction-detail-size'>
        {props.transaction.size} bytes
      </AdaptiveList.Row>
      <AdaptiveList.Row name='Received Time' testId='transaction-detail-received-time'>
        {blockTime}
      </AdaptiveList.Row>
    </AdaptiveList>
  )
}
