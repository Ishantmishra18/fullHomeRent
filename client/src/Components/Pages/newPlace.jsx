import React, { useState, useContext } from "react";
import axios from 'axios'
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import '../../App.css'
import { PostContext } from "../../context/postContext";

const FormComponent = () => {

  const [redirect , setRedirect]= useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    photoCover: null,
    perks: {
      tv: false,
      pets: false,
      water: false,
      wifi: false,
      parking: false,
      ac: false,
    },
  });
  const [photo, setPhoto] = useState(null);
  const { setUser } = useContext(UserContext);
  const {setPost} =useContext(PostContext)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        perks: {
          ...prevData.perks,
          [name]: checked,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };



  const handlePhotoUpload = (e) => {
    setFormData({...formData},{photoCover:e.target.files[0]});
  };
  const handleDrop = (e) =>{
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if(file) setFormData({...formData},{photoCover:file});
    console.log('dropped')
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { data } = await axios.post('/addPlaces', {
      title: formData.title,
      address: formData.address,
      des: formData.description,
      photo: formData.photoLink,
      perks: formData.perks,
    });
    setUser(data.user);
    setPost(data.post)
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to='/account/accommodation' />;
  }

  return (
    <form onSubmit={handleSubmit} className="w-[50vw] mx-auto bg-white p-8 rounded-lg shadow-xl mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Property Details</h2>
      
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-3 mb-4 border-b border-gray-300  focus:outline-none"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        rows="3"
        className="w-full p-3 mb-4 border-b border-gray-300  focus:outline-none"
      />

      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none"
      />
      <div className="w-[40%] mb-4 p-20 bg-neutral-300 relative rounded-md border border-gray-300 text-center" onDrop={handleDrop}  onDragOver={(e) => e.preventDefault()}>
      {formData.photoCover ? (<img   src={URL.createObjectURL(formData.photoCover)} className="h-7 w-8 object-cover"/> ) : (<p> Upload here</p> )}

        <input
        type="file"
        onChange={handlePhotoUpload}
        className=" absolute inset-0 opacity-0"
      />
      </div>
      

      <div className="border border-gray-200 p-4 rounded-md mb-6">
        <p className="text-gray-700 mb-2">Perks:</p>
        <div className="grid grid-cols-3 gap-4">

          {Object.keys(formData.perks).map((perk) => (
            <label key={perk} className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                name={perk}
                checked={formData.perks[perk]}
                onChange={handleChange}
                className="mr-2 text-indigo-500 focus:ring-indigo-400"
              />
              {perk.charAt(0).toUpperCase() + perk.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-5 px-4 bg-main text-white font-semibold rounded-full hover:bg-purple-500 duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default FormComponent;
