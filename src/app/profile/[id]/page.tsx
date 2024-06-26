"use client"
import React, {useEffect, useState} from 'react'
import {getProfile, updateProfile} from "@/api/api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {redirect} from "next/navigation";
import Loader from "@/components/Loader";

const SingleProfile = ({params}) => {

    const [inputActive, setInputActive] = useState(false);
    const [inputQuery, setInputQuery] = useState(null);
    const queryClient = useQueryClient();
    const token = localStorage.getItem('token')
    const { data:user, isLoading } = useQuery({
        queryFn: async () => await getProfile(token),
        queryKey: ["user"],
    });
    if (!token) {
        return redirect('/signin');
    }
    const updateMutation = useMutation({
        mutationFn: async (updateData) => await updateProfile(user.id, updateData),
        onSuccess: () => {
            queryClient.invalidateQueries(["user"]);
        },
    });

    const changeName = async () => {
        setInputActive(true)
    }

    const onSelectPhoto = async (e) => {
        if (e.target.files.length) {
            try {
                updateMutation.mutate({ name: inputQuery });
            }catch (err) {
                console.log(err.message)
            }

        }
    }

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            try {
                updateMutation.mutate({ name: inputQuery });
                setInputActive(false)
            } catch (err) {
                console.log(err.message)
            }

        }
    }

    const handleChangeRole = async () =>{
        let changeValue
        if(user?.role === 'customer'){
            changeValue = 'admin'
        }else{
            changeValue = 'customer'
        }
        try {
            updateMutation.mutate({ role: changeValue });
        }catch (err){
            console.log(err.message)
        }
    }

    useEffect(() => {
        setInputQuery(user?.name)
    }, [user]);



    if (isLoading) {
        return <Loader/>
    }

    return (
        <div className='w-[80%] m-auto mt-12 flex gap-8'>
            <div className='flex flex-col items-center gap-4'>
                <img alt='avatar' src={user.avatar} className='w-52 rounded-full'/>
                <label className='profile-btn'>
                    <input onChange={onSelectPhoto} type='file' className='hidden'/>
                    <span>Change photo</span>
                </label>

            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-2 items-center'>
                    {inputActive ? <input autoFocus onKeyPress={handleKeyPress} value={inputQuery} onChange={(e) => setInputQuery(e.target.value)}/>
                        : <p className='font-bold text-3xl text-gray-600'>{user.name}</p>}
                    {!inputActive && <button onClick={changeName} className='profile-btn'>Change name</button>}
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='text-gray-500'>
                        Status: {user.role === 'customer' ? 'Commentator' : 'Author'}
                    </div>
                    <button onClick={handleChangeRole} className='profile-btn'>Switch
                        to {user.role === 'customer' ? 'Author' : 'Commentator'}</button>
                </div>

                <div className='text-gray-500'>Email: {user.email}</div>

            </div>
        </div>
    )
}

export default SingleProfile
