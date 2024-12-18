import React from 'react'
import Navbar from './Components/Pages/navbar'
import Home from './Components/Pages/home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Components/Pages/login'
import Register from './Components/Pages/register'
import { UserContextProvider } from './context/userContext'
import Account from './Components/Pages/account'
import NewPlace from './Components/Pages/newPlace'
import EditProfile from './Components/Pages/editprofile'
import { PostContextProvider } from './context/postContext'
import Postpage from './Components/Pages/postpage'

const App = () => {  

  const router=createBrowserRouter([
    {
      path:'/',
      element:<>
      <Navbar></Navbar>
      <Home/>
      </>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/register',
      element:<Register/>
    },
    {
      path:'/account',
      element:<Account/>
    },
    {
      path:'/account/booking',
      element:<Account/>
    },
    {
      path:'/account/accommodation',
      element:<Account/>
    },
    {
      path:'/account/accommodation/new',
      element:<NewPlace/>
    },
    {
      path:'/editprofile',
      element:<EditProfile/>
    },
    {
      path:'/:param',
      element:<Postpage/>
    }
  ])
  return (
    <>
    <UserContextProvider>
    <PostContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </PostContextProvider>
    </UserContextProvider>
    </>
  )
}

export default App