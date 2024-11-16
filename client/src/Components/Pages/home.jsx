import React, { useContext, useState } from 'react';
import { PostContext } from '../../context/postContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { post } = useContext(PostContext);

  
if(!post || post.lenght===0) return <>loading...</>
 

  return (
    <div className="h-auto w-screen flex flex-wrap justify-center gap-4 mt-10 pt-10 overflow-x-hidden">
      {post.map((val, key) => (
        <Link to={`/${val._id}`}
          key={key}
          className="homecard duration-200 md:w-[30vw] w-[90vw] bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
        >
          <div className="photocont w-full h-[60%] relative">
            <img
              src={val.cover}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute px-6 py-3 bg-white text-gray bottom-3 right-3 rounded-lg cursor-pointer hover:translate-y-1 duration-200">
              View Gallery
            </div>
          </div>

          <div className="info px-5 py-4">
            <h1 className='text-3xl mb-6 text-ellipsis'>{val.title}</h1>
            <div className="text-xl flex gap-4 items-end">
              <img src={`http://localhost:3000/images/${val.owner.cover}`} alt="" className='h-10 w-10 inline-block object-cover rounded-full'/><h1>{val.owner.username}</h1>
            </div>
            <h1 className="text-xl">
              <span className="text-lg text-gray-500">Location</span> Himanchal Pradesh, India
            </h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
