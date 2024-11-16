import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import { Navigate } from 'react-router-dom';

const EditProfile = () => {
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const { user, setUser } = useContext(UserContext);

    const handleFileChange = (e) => {
        setProfilePic(e.target.files[0]); // Store the file object itself
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
        if (file) setProfilePic(file); // Store the file object
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Create FormData to send the image file along with other fields
        const formData = new FormData();
        formData.append('cover', profilePic);  // Append the file
        formData.append('name', name);
        formData.append('userId', user._id);

        try {
            const { data } = await axios.post('/editprofile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                }
            });

            // Update the user context with the new cover and name
            setUser(prevUser => ({ ...prevUser, cover: data.cover, name }));

            setRedirect(true);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (redirect) {
        return <Navigate to="/account" />;
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-20">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div 
                    className={`relative h-40 w-40 mx-auto rounded-full border-dashed border-2 ${dragActive ? 'border-blue-500' : 'border-gray-300'} flex items-center justify-center overflow-hidden`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {profilePic ? (
                        <img src={URL.createObjectURL(profilePic)} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                        <p className="text-gray-500 text-center">Drag & Drop Image or Click to Upload</p>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0  cursor-pointer"
                    />
                </div>

                <label>
                    <span className="text-gray-600">Name</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border outline-none border-gray-300 rounded-md"
                    />
                </label>

                <button
                    type="submit"
                    className="mt-4 w-full py-4 bg-main text-white rounded-full hover:bg-purple-500 transition duration-200"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
