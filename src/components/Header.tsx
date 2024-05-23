"use client"
import Link from 'next/link'
import {useBlogContext} from "@/api/context";

const Header = () => {

    const token = localStorage.getItem('token')

    const {state:{user},dispatch} = useBlogContext()

    const handleLogout = () =>{
        localStorage.clear()
        dispatch({
            type:"SET_USER",
            payload:null
        })
    }

  return (
    <div className='h-16 bg-blue-500 w-screen text-white flex justify-between items-center p-3'>
        <h1 >Micro blog</h1>
        {token || user ? (
            <div className='cursor-pointer' onClick={handleLogout}>Log out</div>
        ): (
            <ul className='flex gap-3'>
                <Link href='/signin'>
                    Sign in
                </Link>
                <Link href='/signup'>
                    Sign up
                </Link>
            </ul>
        )}
    </div>
  )
}

export default Header
