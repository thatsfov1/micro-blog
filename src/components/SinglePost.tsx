import React from 'react'
import {Post} from "@/types/types";

const SinglePost = ({post}: { post:Post }) => {
  return (
    <div className='p-2 shadow-lg rounded-xl w-[600px]'>
        <div className='p-2 text-slate-500'>{post.author}</div>
        <p>{post.content}</p>
        <div>

        </div>
    </div>
  )
}

export default SinglePost
