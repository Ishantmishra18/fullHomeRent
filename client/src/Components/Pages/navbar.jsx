import React, {useContext} from 'react'
import { TbHomeDown } from "react-icons/tb";
import { TbHomeFilled } from "react-icons/tb";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';
import {UserContext} from '../../context/userContext';


const navbar = () => {

  const {user} = useContext(UserContext)
 
  return (
    <div className=' backdrop-blur-md md:h-[14vh] h-[10vh] w-screen text-main flex justify-between px-6 items-center sticky top-0 z-50'>
      <div className="logo flex items-center gap-4 h-full">
      <TbHomeFilled className='h-[6vh] w-[6vh] aspect-auto text-main'/>
      <h2 className='text-main text-3xl font-bold uppercase md:block hidden'>travo</h2>
      </div>
      <div className="searchinfo w-auto h-[80%] flex gap-2 items-center">
        <div className="place bg-white w-[14vw] rounded-lg rounded-l-full shadow-md shadow-sec">Where</div>
        <div className="duration bg-white w-[12vw] rounded-lg shadow-md shadow-sec">When</div>
        <div className="people bg-white w-[12vw] rounded-r-full rounded-l-lg shadow-md shadow-sec">Who</div>
      </div>
      <div className="mainnavright pr-6"> 
        <Link to={user?'/account':'/login'} className="login flex gap-3  items-center hover:bg-slate-200 px-6 py-2 rounded-lg cursor-pointer">
        <BsPersonCircle className='h-[6vh] w-[6vh] aspect-auto text-black'/>
        <h2 className='text-black text-2xl'>{user!==null?user.username:'LogIn'}</h2>
        </Link>
        
      </div>
    </div>
  )
}

export default navbar