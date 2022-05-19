import {
  HomeIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  InformationCircleIcon,
  CashIcon,
} from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import HeaderIcon from './HeaderIcon'

const Header = () => {
  return (
    <header className='flex place-content-around p-2 bg-gray-100 sticky top-0 z-50 right-0 text-sm'>
      <div className='space-x-6 flex'>
        <Link href='/' passHref>
          <a>
            <Image src='/bank.png' height={38} width={42} alt='' />
          </a>
        </Link>
      </div>

      <div className='flex space-x-5'>
        <div className='flex space-x-5'>
          <Link href='/'>
            <HeaderIcon Icon={HomeIcon} text={'Home'} />
          </Link>

          <Link href='/customers'>
            <HeaderIcon Icon={UserGroupIcon} text={'Customers'} />
          </Link>

          <Link href='/transactions'>
            <HeaderIcon Icon={CurrencyDollarIcon} text={'Transactions'} />
          </Link>

          <Link href='/transfer'>
            <HeaderIcon Icon={CashIcon} text={'Tranfer Money'} />
          </Link>
        </div>

        <Link href='/about'>
          <HeaderIcon Icon={InformationCircleIcon} text={'About'} />
        </Link>
      </div>
    </header>
  )
}
export default Header
