import React from 'react'
import '../../App.css'

const places = ({places}) => {
    
  return (
    <div className='h-auto w-[70vw] flex flex-col gap-4'>
        {places.map((val,key)=>{
            return(
               <div className={`h-[30vh] overflow-hidden w-full rounded-lg rounded-l-none bg-slate-500 relative ${key===0?'rounded-t-xl':key===places.length-1?'rounded-b-xl':''}`}>
                <div className="absolute w-full h-full cover"></div>
                <img src={val.cover} alt="" className='h-full w-full object-cover'/>
                <div className="absolute bottom-2 left-2">
                     <h2 className='text-white text-4xl'>{val.title}</h2>
                     <h3 className='text-white text-xl'>{val.prize}</h3>
                </div>
              
            </div> 
            )
            
        })}

    </div>
  )
}

export default places