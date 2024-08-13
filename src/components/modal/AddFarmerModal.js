/* eslint-disable */
import React, { useState, useEffect } from "react";

const AddFarmerModal = ({ isOpen, onClose, isEdit = false, farmerData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactNumber: "",
    email: "",
    farm_type: "",
  });
  useEffect(() => {
    if (isEdit && farmerData) {
      setFormData({
        name: farmerData.name,
        address: farmerData.address,
        contactNumber: farmerData.contactNumber,
        email: farmerData.email,
        farm_type: farmerData.farm_type,      
      });      
    } else {
      setFormData({
        name: "",
        address: "",
        contactNumber: "",
        email: "",
        farm_type: "",
      })
    }
  }, [isEdit]);

  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      onClose();
    }
};

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">{isEdit ? 'Edit Farmer' : 'Add New Farmer'}</h2>
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
                  onClick={onClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  {isEdit ? 'Save Changes' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFarmerModal;
