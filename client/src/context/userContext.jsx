import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create context for user
export const UserContext = createContext();

// Create a provider component
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  // Maintain user on refresh
  useEffect(() => {
 
      
        try {
          if(!user){
            axios.get('/profile').then(({data})=>{
              setUser(data)
            });
          }
          
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
        console.log('get user data')

    
  },[]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
