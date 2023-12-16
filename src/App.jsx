import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThreeBody from './assets/component/ThreeBody/ThreeBody'


function App() {
  

  return (
    <>
    <main className="flex h-full flex-col items-center w-full" >
    <div className='w-full  h-full overflow-hidden z-20 bg-white  border border-red-400 flex flex-col items-center'>
            <div   className='absolute border z-0 w-full h-4/6 flex-row  flex items-center justify-center'>
              <div className='w-full h-full  bg-purple-300'></div>
              <div className='w-full h-full bg-yellow-300'></div>
              <div className='w-full h-full bg-pink-500'></div>
              <div className='w-full h-full bg-blue-300'></div>
              <div className='w-96 h-96 delay-400 animate-bounce animate-duration-[15000ms] rounded-full animate-infinite absolute left-0 bg-white'></div>
              <div className='w-96 h-40  absolute rounded-full animate-wiggle-more animate-infinite animate-duration-[10000ms] bg-white'></div>
              <div className='w-96 h-96 animate-jump animate-duration-[12000ms] animate-infinite absolute rounded-full  right-0 bg-white'></div>
              <div className='w-40 h-96 animate-spin animate-duration-[100000ms] animate-infinite absolute rounded-full  top-0 bg-white'></div>
            </div>
            <div className="w-full  top-20 h-96  flex mt-96
            bg-green-500 h-40 -skew-y-6 border  " >
            </div>
         
          </div>
      <ThreeBody />
    </main>
    </>
  )
}

export default App
