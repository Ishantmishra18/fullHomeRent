import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/userContext'
import axios from 'axios'
import { Navigate, NavLink ,Link , useLocation} from 'react-router-dom'
import { HiMiniArrowUturnLeft } from "react-icons/hi2";
import Places from '../Parts/places';



const account = () => {
    const {user , setUser}=useContext(UserContext)
    const [redirect , setRedirect]=useState(false)
    const location = useLocation();
    const subdomain = location.pathname; // Get the current path


  
    const arr = [
        {
            title: "Mountain View Cabin",
            prize: "$120 per night",
            url: "https://images.unsplash.com/photo-1709464973748-15ca6633f436?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            title: "Beachside Villa",
            prize: "$200 per night",
            url: "https://plus.unsplash.com/premium_photo-1718285553792-b3b219b76541?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            title: "City Apartment",
            prize: "$150 per night",
            url: "https://images.unsplash.com/photo-1725335742497-38d7d67c2211?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D"
        }
    ];
    
    const arr2 = [
        {
            title: "Desert Oasis",
            prize: "$180 per night",
            cover: "https://plus.unsplash.com/premium_photo-1663040271283-bd044a62da1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            title: "Forest Retreat",
            prize: "$160 per night",
            cover: "https://plus.unsplash.com/premium_photo-1718285549233-42414e1c16f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGxhY2VzfGVufDB8fDB8fHww"
        },
        {
            title: "Lakeside Cottage",
            prize: "$130 per night",
            cover: "https://images.unsplash.com/photo-1705346435684-a9de6cbb53dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGxhY2VzfGVufDB8fDB8fHww"
        },
        {
            title: "Countryside Bungalow",
            prize: "$140 per night",
            cover: "https://images.unsplash.com/photo-1728920823701-13048f597699?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            title: "Ski Resort Chalet",
            prize: "$250 per night",
            cover: "https://images.unsplash.com/photo-1714466330772-097c1f9c43cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D"
        }
    ];
    
    console.log(user.cover)

    const logout=async ()=>{
        await axios.get("/logout")
        setUser(null)
        setRedirect(true)
    }

    if(redirect){
        return<Navigate to={'/'}/>
    }

  return (
    <div className='w-screen h-auto flex'> 
    <div className="sidebar sticky top-0 w-[25vw] h-screen flex flex-col items-center p-10 gap-6 border-r-2">
        <div className="imgcont w-[60%] aspect-square rounded-full overflow-hidden hover:opacity-80">
        <img src={user.cover} alt="" className='w-full h-full object-cover'/></div>
        <Link to='/editprofile' className='text-white px-6 cursor-pointer py-2 rounded-full bg-neutral-600'>edit profile</Link>
        <h2 className='mt-4 text-3xl'><h2 className='text-lg text-neutral-600'>Welcome! </h2>{user?.username}</h2>
       
        <Link to='/' className='flex py-4 px-6 items-center gap-5 text-xl hover:bg-neutral-200 rounded-full'><h2>Back to Home </h2><HiMiniArrowUturnLeft/></Link>
        <button className='px-8 py-5 bg-main text-white rounded-full shadow-xl text-xl' onClick={logout}>LogOut</button>
    </div>
    <div className="right w-[70vw] py-8 flex-col ">
        <div className="uppercont w-full z-40 sticky py-8 backdrop-blur-md top-0 flex  justify-between px-3">
            <div className="flex justify-start gap-10">
            <NavLink to='/account/booking' className={({ isActive })=>`nav-item px-6 py-4 rounded-full  ${isActive ? "bg-main text-white" : "bg-white text-black"}`}>My Bookings</NavLink>
            <NavLink to='/account/accommodation' className={(e)=>`px-6 py-4 rounded-full  ${e.isActive?'bg-main text-white':'bg-white text-black'}`}>My Accodomation</NavLink>
            </div>
    
            <Link to='new' className={`px-6 py-4 rounded-full text-white bg-neutral-800 ${subdomain==='/account/accommodation'?'':'hidden'}`}>Add New</Link>
        </div>

        {(() => {
    if (subdomain === '/account/accommodation') {
        return (
            <>
            <Places places={user?.accommodation || []}/>
            </>
        ) 
    } else if (subdomain === '/account/booking') {
        return <Places places={arr2}/>;
    } else {
        return <div className="">check your booking and accomodation </div>; // Replace with any default component if needed
    }
})()}
    </div>
    
    </div>
  )
}

export default account