"use client"
import {useBlogContext} from "@/api/context";
import SinglePost from "@/components/SinglePost";

const Home = () => {

    const {state: {posts}} = useBlogContext()
    console.log(posts)
    return (
    <main className="">
        <button className='m-4'>Create post</button>
        <div className='m-8 flex flex-col justify-center items-center'>
            {posts?.map((post) => <SinglePost post={post}/>)}
        </div>
    </main>
  );
}


export default Home;
