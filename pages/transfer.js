import Head from 'next/head'
import { connectToDatabase } from '../util/mongodb'
import Header from '../components/Header'
import { useState } from 'react'

export default function Transfer({ customers }) {
  const [formData, setFormData] = useState({
    sender: '',
    receiver: '',
    amount: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const senderData = customers.filter(
      (customer) => customer.email === formData.sender
    )
    const senderUpdatedBalance =
      Number(senderData[0].balance) - Number(formData.amount)
    const updatedSender = {
      email: formData.sender,
      balance: senderUpdatedBalance.toString(),
    }

    const receiverData = customers.filter(
      (customer) => customer.email === formData.receiver
    )
    const receiverUpdatedBalance =
      Number(receiverData[0].balance) + Number(formData.amount)
    const updatedReceiver = {
      email: formData.receiver,
      balance: receiverUpdatedBalance.toString(),
    }

    const responses = await Promise.all([
      fetch('/api/transactions', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      fetch('/api/update', {
        method: 'PUT',
        body: JSON.stringify(updatedSender),
        headers: { 'Content-Type': 'application/json' },
      }),
      fetch('/api/update', {
        method: 'PUT',
        body: JSON.stringify(updatedReceiver),
        headers: { 'Content-Type': 'application/json' },
      }),
    ])

    const data = await Promise.all(responses.map((response) => response.json()))

    e.target.reset()
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

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
            Transfer Money
          </h1>

          <form onSubmit={handleSubmit}>
            <div className='mb-6'>
              <label
                htmlFor='sender'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Select your email
              </label>
              <select
                id='sender'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#693586] focus:border-[#693586] block w-full p-2.5'
                name='sender'
                value={formData.sender}
                onChange={onChange}
              >
                <option value='' disabled selected>
                  Select your option
                </option>
                {customers.map((customer) => (
                  <option
                    className='hover:bg-red-300 focus:bg-[#693586]'
                    value={customer.email}
                    key={customer._id}
                  >
                    {customer.email}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-6'>
              <label
                htmlFor='receiver'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Select the reciver email
              </label>
              <select
                id='receiver'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                name='receiver'
                value={formData.receiver}
                onChange={onChange}
              >
                <option value='' disabled selected>
                  Select your option
                </option>
                {customers.map((customer) => (
                  <option value={customer.email} key={customer._id}>
                    {customer.email}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-6'>
              <label
                htmlFor='amount'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Amount
              </label>
              <input
                type='number'
                id='amount'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                placeholder=''
                required=''
                name='amount'
                onChange={onChange}
              />
            </div>

            <button
              type='submit'
              className='text-white bg-[#693586] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
              Submit
            </button>
          </form>
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
