import React, {Dispatch, SetStateAction, useState} from 'react'
import {useBlogContext} from "@/api/context";

type Props = {
    active:boolean,
    setActive: Dispatch<SetStateAction<boolean>>
}

const Modal = ({active, setActive}:Props) => {
    const [content, setContent] = useState('');
    const {dispatch} = useBlogContext()
    const [errMsg, setErrMsg] = useState('');

    const createPost = () =>{
        if(content){
            dispatch({
                type:"CREATE_POST",
                payload:{
                    id:"1",
                    content:content,
                    author:"dsc"
                }
            })
            setActive(false)
        }else{
            setErrMsg("Write something")
        }
    }

  return (
      <div className={`modal ${active && 'active'}`} onClick={() => setActive(false)}>
          <div className='modal-content' onClick={e => e.stopPropagation()}>
              {errMsg && <span className='err'>{errMsg}</span>}
              <textarea onChange={(e)=> setContent(e.target.value)} placeholder='Write something on your mind...'/>
              <button className='btn' onClick={createPost}>
                  Create
              </button>
          </div>

      </div>
  )
}

export default Modal
