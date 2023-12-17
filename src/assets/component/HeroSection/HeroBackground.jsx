

export default function HeroBackground() {


  
    return(
        <div className="w-full h-full z-10 overflow-hidden border">
            <div className='w-full  h-full overflow-hidden z-20 bg-white  border border-red-400 flex flex-col items-center'>
            <div   className='absolute border z-0 w-full h-4/6 flex-col  flex items-center justify-center overflow-hidden blur-xl'>
            <div className='w-full h-80 absolute  filter animate-pulse   animate-infinite animate-duration-[15000ms] blur-3xl bg-cyan-500  mix-blend-overlay'></div>
            <div className='w-4/6  right-0 absolute h-4/6 animate-spin  animate-duration-[50000ms]   filter blur-3xl  bg-green-400 mix-blend-overlay  '></div>
            
              <div className='w-full left-0 h-64 filter blur-3xl absolute  animate-wiggle-more animate-infinite animate-duration-[15000ms]  bg-purple-500 mix-blend-overlay'></div>
              
              <div className='w-full h-80 left-0 absolute filter blur-3xl animate-bounce animate-infinite animate-duration-[20000ms]  bg-pink-700 mix-blend-overlay'></div>
              <div className='w-full h-full filter absolute   bg-orange-400 mix-blend-overlay'></div>
             
           
            
              
            
            </div >
            <div className="w-full z-20  top-20 h-96  flex mt-96
            bg-white h-40 -skew-y-6   " >
            </div>
         
          </div>
        </div>
    )
}