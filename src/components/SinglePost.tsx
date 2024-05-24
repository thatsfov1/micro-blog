import React, {useState} from 'react'
import {Post} from "@/types/types";
import {useBlogContext} from "@/api/context";
import {useQuery} from "@tanstack/react-query";
import {getProfile} from "@/api/api";

const SinglePost = ({post}: { post: Post }) => {

    const [commentQuery, setCommentQuery] = useState('');
    const [comment, setComment] = useState(false);
    const token = localStorage.getItem('token')
    const { dispatch} = useBlogContext()

    const { data:user } = useQuery({
        queryFn: async () => await getProfile(token),
        queryKey: ["user"],
    });

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
                <div onClick={() => setComment(!comment)} className='ml-2 text-blue-500 cursor-pointer'>
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
                        <button className='btn' onClick={createComment}>Comment</button>
                    </div>

                </div>
            }

        </div>
    )
}

export default SinglePost
