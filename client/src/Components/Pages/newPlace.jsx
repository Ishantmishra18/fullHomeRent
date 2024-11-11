import React, { useState , useContext } from "react";
import axios from 'axios'
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const FormComponent = () => {

  const [redirect , setRedirect]= useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    photoLink: "",
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
  const {setUser}=useContext(UserContext)

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
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const {data} = await axios.post('/addPlaces',{
      title :formData.title,
      address : formData.address,
      des : formData.description,
      photo : formData.photoLink,
      perks:formData.perks,
    })
    setUser(data)
    console.log(data)
    setRedirect(true)
    console.log('hello')
  };

  if(redirect){
    return <Navigate to='/account/accommodation'></Navigate>
  }

  return (
    <form onSubmit={handleSubmit} className="w-[35vw] mt-10 mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Property Details</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        rows="3"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      
      <input
        type="text"
        name="photoLink"
        placeholder="Photo Link"
        value={formData.photoLink}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      
      <input
        type="file"
        onChange={handlePhotoUpload}
        className="w-full mb-4 px-5 py-3 rounded-lg"
      />
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        {Object.keys(formData.perks).map((perk) => (
          <label key={perk} className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              name={perk}
              checked={formData.perks[perk]}
              onChange={handleChange}
              className="mr-2 text-green-500 focus:ring-green-400"
            />
            {perk.charAt(0).toUpperCase() + perk.slice(1)}
          </label>
        ))}
      </div>
      
      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export default FormComponent;
