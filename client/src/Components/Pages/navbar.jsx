import React from 'react'
import { TbHomeDown } from "react-icons/tb";
import { TbHomeFilled } from "react-icons/tb";
import { BsPersonCircle } from "react-icons/bs";

const navbar = () => {
  return (
    <div className='bg-main md:h-[14vh] h-[10vh] w-screen text-main flex justify-between px-6 items-center '>
      <div className="logo flex items-center gap-4 h-full">
      <TbHomeFilled className='h-[6vh] w-[6vh] aspect-auto text-white'/>
      <h2 className='text-white text-3xl font-bold uppercase md:block hidden'>travo</h2>
      </div>
      <div className="searchinfo w-auto h-[80%] flex gap-2 items-center">
        <div className="place bg-white w-[14vw] rounded-lg rounded-l-full shadow-md shadow-sec">Where</div>
        <div className="duration bg-white w-[12vw] rounded-lg shadow-md shadow-sec">When</div>
        <div className="people bg-white w-[12vw] rounded-r-full rounded-l-lg shadow-md shadow-sec">Who</div>
      </div>
      <div className="right">
        <div className="login flex gap-3 flex-col items-center">
        <BsPersonCircle className='h-[70%] w-[70%] aspect-auto text-white'/>
        <h2 className='text-white text-xl'>Log In</h2>
        </div>
      </div>
    </div>
  )
}

export default navbar