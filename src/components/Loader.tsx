import React from 'react'
import loading from '../assets/animated/loading.svg'

const Loader = () => {
  return (
    <div className='w-screen mt-60 text-center'>
      <img src={loading} alt='Loading...'/>
    </div>
  )
}

export default Loader
