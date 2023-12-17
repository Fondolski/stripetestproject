import {useState} from 'react'

import { IoMenu, IoClose } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";


const menu =['Products', 'Solutions', "Developers", "Resources", "Pricing"]


export default function TopBar() {

    const [openMenu, setOpenMenu] = useState(false)

    return(
        <div className="w-11/12 overflow-hidden mt-5 z-40 p-3 mt-1 absolute max-w-5xl flex-col top-0 flex items-center ">
            <div className="flex flex-row justify-between h-5 items-center z-10  w-full">
                <div className="text-white font-bold text-2xl">Stripe</div>
                <div className='drop-shadow-md font-bold' onClick={()=> setOpenMenu(true)} > 
                    <IoMenu size={25} color='white' />
                </div>
                <div className='flex md:ml-44 ml-0 flex-row invisible md:visible absolute'>
                    {menu.map((item, i)=> {
                        return(
                            <div className='px-2 text-white font-semibold' key={i}>{item}</div>
                        )
                    })}
                </div>
            </div>
            <div className='bg-black top-0 h-5 rounded-md absolute w-full h-full opacity-10'></div>
            {openMenu ? <div className='border w-full bg-white z-20 rounded-md absolute p-3'>
                <div className='flex flex-row items-center justify-between'>
                    <div className='text-purple-600 font-bold text-2xl'>Stripe</div>
                    <div className='' onClick={()=> setOpenMenu(false)}>
                        <IoClose size={20} />
                    </div>
                </div>
                <div className='flex flex-col mt-3'>
                    {menu.map((item, i)=> {
                        return(
                            <div className='flex flex-row items-center justify-between' key={i}>
                                <div className='py-3 font-semibold text-lg'>{item}</div>
                                <div onClick={()=> setOpenMenu(false)}>
                                    <MdKeyboardArrowRight size={25} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>: null}
        </div>
    )
}