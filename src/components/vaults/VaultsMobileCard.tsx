import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { TextMiddleTruncate } from '@components/commons/TextMiddleTruncate'
import NumberFormat from 'react-number-format'
import { VaultStatus } from '@components/vaults/VaultsStatus'
import { LoanVaultActive, LoanVaultLiquidated, LoanVaultState } from '@defichain/whale-api-client/dist/api/loan'
import { VaultTokenSymbols } from '@components/vaults/VaultTokenSymbols'
import { useState } from 'react'
import { Transition } from '@headlessui/react'
import { Link } from '@components/commons/Link'

interface VaultsMobileCardProps {
  vault: LoanVaultActive | LoanVaultLiquidated
}

export function VaultsMobileCard (props: VaultsMobileCardProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className='w-full flex flex-wrap rounded border border-gray-200 p-4 text-gray-500'>
      <div className='w-full flex justify-between'>
        <div className='flex items-center gap-x-1.5'>
          Vault ID
          <VaultStatus
            state={props.vault.state} className='px-2 py-1 inline-block text-xs'
            testId={`VaultRow.${props.vault.vaultId}.VaultStatus`}
          />
        </div>
        <div
          className='flex items-center px-2 gap-x-0.5 text-primary-500 cursor-pointer'
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen
            ? <>VIEW<MdOutlineKeyboardArrowDown size={28} /></>
            : <>HIDE<MdOutlineKeyboardArrowUp size={28} /></>}
        </div>
      </div>

      <Link href={{ pathname: `/vaults/${props.vault.vaultId}` }}>
        <div className=' mt-2 text-primary-500 underline cursor-pointer'>
          <TextMiddleTruncate
            textLength={6} text={props.vault.vaultId}
            testId={`VaultRow.VaultID.${props.vault.vaultId}`}
          />
        </div>
      </Link>

      <Transition
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-0'
        enterTo='opacity-100 translate-y-1'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-1'
        leaveTo='opacity-100 translate-y-0'
        className='w-full'
        show={isOpen}
      >
        {
          props.vault.state === LoanVaultState.IN_LIQUIDATION
            ? <LiquidatedVaultDetails />
            : <ActiveVaultDetails vault={props.vault} />
        }
      </Transition>
    </div>
  )
}

function ActiveVaultDetails (props: { vault: LoanVaultActive }): JSX.Element {
  return (
    <div className='w-full mt-2 flex flex-col gap-y-1'>
      <div className='w-full flex justify-between'>
        Loans
        <VaultTokenSymbols tokens={props.vault.loanAmounts} />
      </div>
      <div className='w-full flex justify-between'>
        Loans Value (USD)
        <NumberFormat
          value={props.vault.loanValue}
          displayType='text'
          decimalScale={2}
          fixedDecimalScale
          thousandSeparator
          prefix='$'
        />
      </div>
      <div className='w-full flex justify-between'>
        Collateral
        <VaultTokenSymbols tokens={props.vault.collateralAmounts} />
      </div>
      <div className='w-full flex justify-between'>
        Collateral Value (USD)
        <NumberFormat
          value={props.vault.collateralValue}
          displayType='text'
          decimalScale={2}
          fixedDecimalScale
          thousandSeparator
          prefix='$'
        />
      </div>
      <div className='w-full flex justify-between'>
        Collateral Ratio
        <span data-testid={`VaultRow.${props.vault.vaultId}.CollateralRatio`}>{`${props.vault.collateralRatio}%`}</span>
      </div>
    </div>
  )
}

function LiquidatedVaultDetails (): JSX.Element {
  return (
    <div className='w-full mt-2 flex flex-col gap-y-1'>
      <div className='w-full flex justify-between'>
        Loans
        <span>N/A</span>
      </div>
      <div className='w-full flex justify-between'>
        Loans Value (USD)
        <span>N/A</span>
      </div>
      <div className='w-full flex justify-between'>
        Collateral
        <span>N/A</span>
      </div>
      <div className='w-full flex justify-between'>
        Collateral Value (USD)
        <span>N/A</span>
      </div>
      <div className='w-full flex justify-between'>
        Collateral Ratio
        <span>N/A</span>
      </div>
    </div>
  )
}
