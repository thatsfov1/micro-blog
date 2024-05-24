"use client"
import Link from 'next/link'
import {useBlogContext} from "@/api/context";
import {useQuery} from "@tanstack/react-query";
import {getProfile} from "@/api/api";
import {useRouter} from "next/navigation";

const Header = () => {

    const token = localStorage.getItem('token')
    const { data:user } = useQuery({
        queryFn: async () => await getProfile(token),
        queryKey: ["user"],
    });

    const {dispatch} = useBlogContext()
    const router = useRouter()

    const handleLogout = () =>{
        localStorage.clear()
        router.push('/signin')

    }

  return (
    <div className='h-16 bg-blue-500 w-screen text-white flex justify-between items-center p-3'>
        <Link href='/'>Micro blog</Link>
        {token || user ? (
            <div className='flex gap-4'>
                <Link href={`/profile/${user?.id}`} className='cursor-pointer'>My profile</Link>
                <div className='cursor-pointer' onClick={handleLogout}>Log out</div>
            </div>
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
