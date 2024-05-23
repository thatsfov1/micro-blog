import Link from 'next/link'

const Header = () => {
  return (
    <div className='h-16 bg-blue-500 w-screen text-white flex justify-between items-center p-3'>
        <h1 >Micro blog</h1>
        <ul className='flex gap-3'>
            <Link href='/signin'>
                Sign in
            </Link>
            <Link href='/signup'>
                Sign up
            </Link>
        </ul>
    </div>
  )
}

export default Header
