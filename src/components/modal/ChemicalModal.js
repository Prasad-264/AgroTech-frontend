/* eslint-disable */
import React, { useState, useEffect } from "react";

const ChemicalModal = ({ isOpen, onClose, isEdit = false, chemicalData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    quantity: "",
    cost: "",
    description: "",
  });
  useEffect(() => {
    if (isEdit && chemicalData) {
      setFormData({
        name: chemicalData.name,
        manufacturer: chemicalData.manufacturer,
        quantity: chemicalData.quantity,
        cost: chemicalData.cost,
        description: chemicalData.description,      
      });      
    } else {
      setFormData({
        name: "",
        manufacturer: "",
        quantity: "",
        cost: "",
        description: "",
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
    }

    if (!formData.manufacturer) {
      tempErrors.manufacturer = "Manufacturer is required";
      valid = false;
    }

    if (!formData.quantity) {
      tempErrors.quantity = "Quantity is required";
      valid = false;
    }
    
    if (!formData.cost) {
      tempErrors.cost = "Cost is required";
      valid = false;
    }

    if (!formData.description) {
      tempErrors.description = "Description is required";
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
            <h2 className="text-2xl font-semibold mb-4">{isEdit ? 'Edit Fertilizer' : 'Add New Fertilizer'}</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
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
                  Manufacturer
                </label>
                <input
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  placeholder="Enter manufacturer"
                  className={`w-full p-2 border rounded-md ${
                    errors.manufacturer ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.manufacturer && (
                  <p className="text-red-500 text-sm mt-1">{errors.manufacturer}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity e.g. 5 Kg"
                  className={`w-full p-2 border rounded-md ${
                    errors.quantity ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Cost
                </label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  placeholder="Enter cost"
                  className={`w-full p-2 border rounded-md ${
                    errors.cost ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.cost && (
                  <p className="text-red-500 text-sm mt-1">{errors.cost}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  className={`w-full p-2 border rounded-md ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
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

export default ChemicalModal;