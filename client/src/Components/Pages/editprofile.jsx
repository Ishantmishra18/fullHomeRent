import React, { useState , useContext } from 'react';
import axios from 'axios'
import { UserContext } from '../../context/userContext';
import { Navigate } from 'react-router-dom';

const EditProfile = () => {
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [redirect , setRedirect]=useState(false)

    const{user, setUser}=useContext(UserContext)

    const handleFileChange = (e) => {
        setProfilePic(URL.createObjectURL(e.target.files[0]));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => setDragActive(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        if (file) setProfilePic(URL.createObjectURL(file));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {data}=await axios.post('/editprofile',{
            cover:profilePic,   
            name,
            userId:user._id
        })
        setUser(user,{cover:profilePic,name})
        setRedirect(true)
    };

    if(redirect) {
        return <Navigate to="/account" />;
    }


    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div 
                    className={`relative h-40 w-40 mx-auto rounded-full border-dashed border-2 ${
                        dragActive ? 'border-blue-500' : 'border-gray-300'
                    } flex items-center justify-center overflow-hidden`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {profilePic ? (
                        <img src={profilePic} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                        <p className="text-gray-500">Drag & Drop Image or Click to Upload</p>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>

                <label className="">
                    <span className="text-gray-600">Name</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border outline-none border-gray-300 rounded-md "
                    />
                </label>

                <button
                    type="submit"
                    className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
