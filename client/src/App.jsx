import React from 'react'
import Navbar from './Components/Pages/navbar'
import Home from './Components/Pages/home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Components/Pages/login'
import Register from './Components/Pages/register'

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
    }
  ])
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App