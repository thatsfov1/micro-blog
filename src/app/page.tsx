"use client"
import {useBlogContext} from "@/api/context";
import SinglePost from "@/components/SinglePost";
import {redirect} from "next/navigation";
import { useState} from "react";
import Modal from "@/components/Modal";
import {getProfile} from "@/api/api";
import {useQuery} from "@tanstack/react-query";
import Loader from "@/components/Loader";

const Home = () => {

    const token = localStorage.getItem('token')
    const [modalActive, setModalActive] = useState(false);
    if (!token) {
        return redirect('/signin');
    }
    const {state: {posts}} = useBlogContext()

    const { data:user, isLoading } = useQuery({
        queryFn: async () => await getProfile(token),
        queryKey: ["user"],
    });

    if (true) {
        return <Loader/>;
    }
    return (
    <main className="">
        {user?.role === "admin" && <button className='m-4 btn' onClick={() => setModalActive(true)}>Create post</button>}
        <div className='m-8 flex flex-col justify-center items-center'>
            {posts?.map((post) => <SinglePost key={post.id} post={post}/>)}
        </div>
        <Modal active={modalActive} setActive={setModalActive}/>
    </main>
  );
}


export default Home;
