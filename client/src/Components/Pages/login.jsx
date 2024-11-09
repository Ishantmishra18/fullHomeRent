import React, { useState ,useContext} from 'react'
import { Link, Navigate  } from 'react-router-dom'
import axios from 'axios'
import { UserContext} from '../../context/userContext'

const login = () => {
    const [username, setUsername]=useState('')
    const [password, setPassword]=useState('')
    const [redirect , setRedirect]=useState(false)
    const [error , setError]=useState('')

    const {setUser}=useContext(UserContext)

    const loginSub = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { username, password }
                  // This ensures the cookie is sent with the request
            );
           
            
            if (response.status === 200) {
                console.log('Logged In:', response.data);
                setUser(response.data.user); 
                setRedirect(true);  // Redirect only if login is successful
            }
        } catch (error) {
            if (error.response) {
                // Check the status code to determine the error type
                if (error.response.status === 404) {
                    setError('User not found');
                } else if (error.response.status === 401) {
                    setError('Incorrect password');
                } else {
                    setError('Login failed. Please try again.');
                }
            } else {
                setError('Login failed. Please check your connection and try again.');
            }
            console.error('Login error:', error);
        }
    };
    

    if (redirect) {
        return <Navigate to="/" />;
    }

  return (
    <div className='h-screen w-screen grid place-content-center bg-neutral-100'>
        <div className="logincard h-auto w-[35vw] px-10 py-6 shadow-lg bg-white rounded-md">
           
            <form action="" onSubmit={loginSub} className='flex flex-col gap-4 items-center '>
                 <h1 className='text-3xl text-neutral-800'>Login User</h1>
                <input type="text" placeholder='username' value={username} onChange={e=>setUsername(e.target.value)} className=' border-b-2 border-neutral-200 outline-none h-16 w-full' />
                <input type="password" placeholder='password'  value={password} onChange={e=>setPassword(e.target.value)} className=' border-b-2 border-neutral-200  outline-none h-16 w-full'/>
                {error && <p className="text-red-500">{error}</p>}
                <input type="submit" className='h-16 w-full mt-24 bg-neutral-700 text-white rounded-md cursor-pointer'/>
                <h4>Don't have an account? <Link to='/register' className='underline text-blue-600'>create account </Link></h4>
            </form>
        </div>
    </div>
  )
}

export default login