import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [conPass, setConPass] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleUser = (e) => {
        setUsername(e.target.value);
    };

    const handlePass = (e) => {
        setPassword(e.target.value);
    };

    const handleCon = (e) => {
        setConPass(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if passwords match
        if (password !== conPass) {
            setError("Passwords do not match");
            return;
        }

        setError('');
        setSuccess('');

    
            // Make the POST request to the backend
            const response = await axios.post('http://localhost:3000/register', {
                username,
                password
            });

            // If registration is successful, display a success message
            setSuccess("Registration successful!");
            console.log(response.data);  // Log the response data for debugging

            // Optionally, clear the input fields
            setUsername('');
            setPassword('');
            setConPass('');
    };

    return (
        <div className="h-screen w-screen grid place-content-center bg-neutral-100">
            <div className="logincard h-auto w-[35vw] px-10 py-6 shadow-lg bg-white rounded-md">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
                    <h1 className="text-3xl text-neutral-800">Create User</h1>
                    <input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={handleUser}
                        className="border-b-2 border-neutral-200 outline-none h-16 w-full"
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={handlePass}
                        className="border-b-2 border-neutral-200 outline-none h-16 w-full"
                    />
                    <input
                        type="password"
                        placeholder="confirm password"
                        value={conPass}
                        onChange={handleCon}
                        className="border-b-2 border-neutral-200 outline-none h-16 w-full"
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <input
                        type="submit"
                        value="Register"
                        className="h-16 w-full mt-6 bg-neutral-700 text-white rounded-md cursor-pointer"
                    />
                    <h4>
                        Already have an account?{' '}
                        <Link to="/login" className="underline text-blue-600">
                            Login account
                        </Link>
                    </h4>
                </form>
            </div>
        </div>
    );
};

export default Register;
