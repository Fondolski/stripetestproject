import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThreeBody from './assets/component/ThreeBody/ThreeBody'
import HeroBody from './assets/component/HeroSection/HeroBody'


function App() {
  

  return (
    <>
    <main className="flex h-full flex-col items-center w-full" >
      <HeroBody />
      <ThreeBody />
    </main>
    </>
  )
}

export default App
