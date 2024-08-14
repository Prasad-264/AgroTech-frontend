/* eslint-disable */
import React, { useState, useEffect } from "react";

const CropModal = ({ isOpen, onClose, isEdit = false, cropData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    cropName: "",
    season: "",
    category: "",
  });
  useEffect(() => {
    if (isEdit && cropData) {
      setFormData({
        cropName: cropData.cropName,
        season: cropData.season,
        category: cropData.category,    
      });      
    } else {
      setFormData({
        cropName: "",
        season: "",
        category: "",
      })
    }
  }, [isEdit]);

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    let valid = true;

    if (!formData.cropName) {
      tempErrors.cropName = "Name is required";
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.cropName)) {
      tempErrors.cropName = "Crop name must contain only letters and spaces";
      valid = false;
    }

    if (!formData.season) {
      tempErrors.season = "season is required";
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.season)) {
      tempErrors.season = "season must contain only letters and spaces";
      valid = false;
    }

    if (!formData.category) {
      tempErrors.category = "category is required";
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.category)) {
      tempErrors.category = "category must contain only letters and spaces";
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
            <h2 className="text-2xl font-semibold mb-4">{isEdit ? 'Edit Crop' : 'Add New Crop'}</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Crop Name</label>
                <input
                  type="text"
                  name="cropName"
                  value={formData.cropName}
                  onChange={handleChange}
                  placeholder="Enter crop name"
                  className={`w-full p-2 border rounded-md ${
                    errors.cropName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.cropName && (
                  <p className="text-red-500 text-sm mt-1">{errors.cropName}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Season
                </label>
                <input
                  type="text"
                  name="season"
                  value={formData.season}
                  onChange={handleChange}
                  placeholder="Enter season"
                  className={`w-full p-2 border rounded-md ${
                    errors.season ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.season && (
                  <p className="text-red-500 text-sm mt-1">{errors.season}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter crop category"
                  className={`w-full p-2 border rounded-md ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
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

export default CropModal;