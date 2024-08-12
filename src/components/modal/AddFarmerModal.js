import React, { useState } from "react";
import Notification from "../Notification";

const AddFarmerModal = ({ userId, onFarmerAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactNumber: "",
    email: "",
    farm_type: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const validate = () => {
    let tempErrors = {};
    let valid = true;

    if (!formData.name) {
      tempErrors.name = "Name is required";
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      tempErrors.name = "Name must contain only letters and spaces";
      valid = false;
    }

    if (!formData.address) {
      tempErrors.address = "Address is required";
      valid = false;
    }

    if (!formData.contactNumber) {
      tempErrors.contactNumber = "Contact number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      tempErrors.contactNumber = "Contact number must be 10 digits";
      valid = false;
    }

    if (!formData.email) {
      tempErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email address is invalid";
      valid = false;
    }

    if (!formData.farm_type) {
      tempErrors.farm_type = "Farm type is required";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setSuccess(false);
      try {
        const response = await fetch(`http://localhost:6001/api/farmer/${userId}/add-farmer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error("Failed to add farmer");
        }
  
        const data = await response.json();
        console.log("Form submitted successfully", data);
        setSuccess(true);
        onFarmerAdded();
        toggleModal();
      } catch (err) {
        setErrors(err.message);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setSuccess(false);
  }

  return (
    <div>
      <button 
        onClick={toggleModal}
        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Add Farmer
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Add Farmer</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className={`w-full p-2 border rounded-md ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className={`w-full p-2 border rounded-md ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Enter 10-digit contact number"
                  className={`w-full p-2 border rounded-md ${
                    errors.contactNumber ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contactNumber}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className={`w-full p-2 border rounded-md ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Farm Type
                </label>
                <input
                  type="text"
                  name="farm_type"
                  value={formData.farm_type}
                  onChange={handleChange}
                  placeholder="Enter type of farm"
                  className={`w-full p-2 border rounded-md ${
                    errors.farm_type ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.farm_type && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.farm_type}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {success && <Notification 
        message={"Farmer added successfully!"}
        onClose={handleClose}
      />}
    </div>
  );
};

export default AddFarmerModal;
