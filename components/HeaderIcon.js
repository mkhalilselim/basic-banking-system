const HeaderIcon = ({ Icon, text, role, onClick }) => {
  return (
    <div
      className='flex items-center flex-col text-gray-500 hover:text-black cursor-pointer transition-all'
      role={role}
      onClick={onClick}
    >
      <Icon className='h-6 w-6' />
      <p>{text}</p>
    </div>
  )
}
export default HeaderIcon
