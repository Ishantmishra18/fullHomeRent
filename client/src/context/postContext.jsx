import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const PostContext = createContext();

export function PostContextProvider({ children }) {
  const [post, setPost] = useState(null);


  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!post) {
          const { data } = await axios.get('/postdata');
          setPost(data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchPost();
  },[]);

  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
}
