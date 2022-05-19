import Head from 'next/head'
import { connectToDatabase } from '../util/mongodb'
import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/outline'
import Header from '../components/Header'

export default function transactions({ transactions }) {
  return (
    <div className=''>
      <Head>
        <title>Onlin Bank</title>
        <meta name='description' content='Your Online Bank' />
        <link rel='icon' href='/bank.png' />
      </Head>

      <Header />

      <main className='flex flex-row items-center justify-center'>
        <div className='space-y-10 pt-20'>
          <h1 className='text-5xl max-w-xl leading-normal text-[#693586]'>
            Transactions
          </h1>

          <div className='relative shadow-md sm:rounded-lg'>
            <table className='w-full text-xl text-left text-gray-500'>
              <thead className='text-sm text-black uppercase bg-[#693586]'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Sender Email
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Receiver Email
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction._id}
                    className='bg-white border-b hover:bg-gray-50'
                  >
                    <th scope='row' className='px-6 py-4'>
                      {transaction.sender}
                    </th>
                    <td className='px-6 py-4'>{transaction.receiver}</td>
                    <td className='px-6 py-4'>{transaction.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase()

  const data = await db
    .collection('transactions')
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray()

  const transactions = JSON.parse(JSON.stringify(data))

  return {
    props: { transactions },
  }
}
