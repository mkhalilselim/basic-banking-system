import Head from 'next/head'
import { connectToDatabase } from '../util/mongodb'
import Header from '../components/Header'

export default function customers({ customers }) {
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
            Customers
          </h1>

          <div className='relative shadow-md sm:rounded-lg'>
            <table className='w-full text-xl text-left text-gray-500'>
              <thead className='text-sm text-black uppercase bg-[#693586]'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Customer Name
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Email
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Balance
                  </th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr
                    key={customer._id}
                    className='bg-white border-b hover:bg-gray-50'
                  >
                    <th
                      scope='row'
                      className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
                    >
                      {customer.name}
                    </th>
                    <td className='px-6 py-4'>{customer.email}</td>
                    <td className='px-6 py-4'>{customer.balance}</td>
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
