import Head from 'next/head'
import Header from '../components/Header'

export default function about() {
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
            The Sparks Bank
          </h1>

          <div className='relative'>
            <p className='text-2xl'>
              This is a web application used to transfer money between multiple.
              users
            </p>
            <p className='text-2xl'>
              This app is built using NextJs, Tailwind CSS and MongoDb.
            </p>
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  )
}
