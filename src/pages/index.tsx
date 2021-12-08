import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpairs'
import { Transaction } from '@defichain/whale-api-client/dist/api/transactions'

import { getWhaleApiClient, useWhaleApiClient } from '@contexts/WhaleContext'

import { Container } from '@components/commons/Container'
import { IndexHeader } from '@components/index/IndexHeader'
import { LiquidityPoolList } from '@components/index/LiquidityPoolList'
import { BlocksList } from '@components/index/BlocksList'
import { TransactionsList } from '@components/index/TransactionsList'
import { useEffect, useState } from 'react'

interface HomePageProps {
  blocks: Block[]
  transactions: Transaction[]
  liquidityPools: PoolPairData[]
}

export default function HomePage (props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [data, setData] = useState<HomePageProps>({
    blocks: [],
    transactions: [],
    liquidityPools: []
  })

  const [clientSide, setClientSide] = useState<boolean>(false)
  const api = useWhaleApiClient()

  useEffect(() => {
    void fetchData()
    const interval = setInterval(() => {
      void fetchData()
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  async function fetchData (): Promise<void> {
    const blocks = await api.blocks.list(8)

    let transactions: Transaction[] = []
    await Promise.all(
      blocks.map(async block =>
        await api.blocks.getTransactions(block.id, 8)
          .then(results => {
            return results
          })
      )
    ).then(results => {
      results.map(result =>
        transactions.push(...result)
      )
    })
    transactions = transactions.slice(0, 8)

    const liquidityPools = await api.poolpairs.list(8)

    setData({
      transactions,
      blocks,
      liquidityPools
    })

    setClientSide(true)
  }

  return (
    <>
      <IndexHeader />
      <Container className='pb-20'>
        <div className='flex flex-wrap -mx-2'>
          <div className='w-full lg:w-1/2 xl:w-3/5 px-1'>
            <TransactionsList transactions={clientSide ? data.transactions : props.transactions} />
          </div>
          <div className='w-full lg:w-1/2 xl:w-2/5 px-1'>
            <BlocksList blocks={clientSide ? data.blocks : props.blocks} />
          </div>
        </div>
        <LiquidityPoolList liquidityPools={clientSide ? data.liquidityPools : props.liquidityPools} />
      </Container>
    </>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<HomePageProps>> {
  const api = getWhaleApiClient(context)
  const blocks = await api.blocks.list(8)

  let transactions: Transaction[] = []
  await Promise.all(
    blocks.map(async block =>
      await api.blocks.getTransactions(block.id, 8)
        .then(results => {
          return results
        })
    )
  ).then(results => {
    results.map(result =>
      transactions.push(...result)
    )
  })
  transactions = transactions.slice(0, 8)

  const liquidityPools = await api.poolpairs.list(8)

  return {
    props: {
      blocks,
      transactions,
      liquidityPools
    }
  }
}
