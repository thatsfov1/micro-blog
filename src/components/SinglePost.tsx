import React, {useState} from 'react'
import {Post} from "@/types/types";
import {useBlogContext} from "@/api/context";

const SinglePost = ({post}: { post: Post }) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [commentQuery, setCommentQuery] = useState('');
    const [comment, setComment] = useState(false);

    const {dispatch} = useBlogContext()

    const createComment = () => {
        dispatch({
            type: "CREATE_COMMENT",
            payload: {
                id: post.id,
                name: user.name,
                content: commentQuery
            }
        })
        setCommentQuery('')
    }

    return (
        <div className='p-2 shadow-lg rounded-xl w-[600px]'>
            <div className='p-2 text-slate-500'>{post.author}</div>
            <p>{post.content}</p>
            {user?.role === "customer" && (
                <div onClick={() => setComment(!comment)} className='text-blue-500 cursor-pointer'>
                    Comment...
                </div>
            )}
            {
                comment && <div>
                    <div>
                        {post.comments?.map(comment => (
                            <div key={comment.content}>
                                <p className='text-slate-500'>{comment.name}</p>
                                <p className='ml-4'>{comment.content}</p>
                            </div>
                        ))}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <textarea value={commentQuery} onChange={(e) => setCommentQuery(e.target.value)}
                                  placeholder='Comment this post'/>
                        <button onClick={createComment}>Comment</button>
                    </div>

                </div>
            }

        </div>
    )
}

export default SinglePost
