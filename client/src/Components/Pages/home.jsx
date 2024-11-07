import React from 'react'

const home = () => {
    let items =[1, 2, 4, 5, 6, 7,8,4]
  return (
    <div className='h-auto w-screen flex flex-wrap justify-center gap-4 mt-10 pt-10 overflow-x-hidden'>
        {items.map((val, key)=>(
            <div className="homecard duration-200 md:w-[30vw] w-[90vw] bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
                <div className="photocont w-full h-[60%] relative">
                <img src="https://www.homewayproperties.in/assets/images/gallery/3-2.jpg" alt="" className='h-full w-full'  />
                <div className="absolute px-6 py-3 bg-white text-gray bottom-3 right-3 rounded-lg cursor-pointer hover:translate-y-1 duration-200">view gallery</div>
                </div>

                <div className="info px-5 py-4">
                        <h1 className='text-xl'><span className='text-lg text-gray-500'>Price</span>   14400Rs/night</h1>
                        <h1 className='text-xl'><span className='text-lg text-gray-500'>Location</span>  Himanchal Pradesh , India</h1>
                </div>
            </div>
        ))}
    </div>
  )
}

export default home