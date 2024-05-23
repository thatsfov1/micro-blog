"use client"
import {useBlogContext} from "@/api/context";
import SinglePost from "@/components/SinglePost";
import {redirect} from "next/navigation";
import {useEffect, useState} from "react";
import Modal from "@/components/Modal";
import {getProfile} from "@/api/api";

const Home = () => {

    const token = localStorage.getItem('token')

    const [modalActive, setModalActive] = useState(false);


    if (!token) {
        return redirect('/signin');
    }

    const {state: {posts, user},dispatch} = useBlogContext()

    const fetchProfile = async ()=>{
        const user = await getProfile(token)
        dispatch({type: 'SET_USER', payload: user});
    }

    useEffect(() => {
        if (!user) {
            fetchProfile();
        }
    }, [user]);

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
    <main className="">
        {user?.role === "admin" && <button className='m-4' onClick={() => setModalActive(true)}>Create post</button>}
        <div className='m-8 flex flex-col justify-center items-center'>
            {posts?.map((post) => <SinglePost key={post.id} post={post}/>)}
        </div>
        <Modal active={modalActive} setActive={setModalActive}/>
    </main>
  );
}


export default Home;
