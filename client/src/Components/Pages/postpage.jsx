import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { PostContext } from '../../context/postContext';

const postpage = () => {

    const {post}=useContext(PostContext)

    const { param } = useParams();
    const thispost = post.find(post => post._id === param);
    
  return (
    <div className="w-screen h-auto">
    <div>the owner of this post is {thispost.owner.username}</div>
    <img src={thispost.cover} alt="" className='h-[40vh] w-screen'/>
    </div>
  )
}

export default postpage