import Head from 'next/head'
import { connectToDatabase } from '../util/mongodb'
import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/outline'
import Header from '../components/Header'

export default function Home({ customers }) {
  return (
    <div className=''>
      <Head>
        <title>Sparks Bank</title>
        <meta name='description' content='Your Online Bank' />
        <link rel='icon' href='/bank.png' />
      </Head>

      <Header />

      <main className='flex flex-col xl:flex-row items-center max-w-[1105px] mx-auto'>
        <div className='space-y-10 pt-32'>
          <h1 className='text-3xl md:text-5xl lg:text-7xl max-w-xl leading-normal text-[#693586]'>
            Welcome to the sparks bank
          </h1>

          <div className='space-y-4'>
            <div className='home-item'>
              <h1>View Customers</h1>
              <ChevronRightIcon className='text-gray-500 h-6 w-6' />
            </div>
            <div className='home-item'>
              <h1>View Transactions</h1>
              <ChevronRightIcon className='text-gray-500 h-6 w-6' />
            </div>
            <div className='home-item'>
              <h1>Transfer Money</h1>
              <ChevronRightIcon className='text-gray-500 h-6 w-6' />
            </div>
          </div>
        </div>

        <div className='relative xl:absolute w-96 h-96 xl:w-[900px] xl:h-[900px] top-5 right-3'>
          <Image src='/bank-art5.png' alt='' layout='fill' priority />
        </div>
      </main>

      <footer></footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase()

  const data = await db
    .collection('customers')
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray()

  const customers = JSON.parse(JSON.stringify(data))

  return {
    props: { customers },
  }
}
