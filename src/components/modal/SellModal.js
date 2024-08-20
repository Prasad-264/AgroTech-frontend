import React, { useState } from "react";

const SellModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    quantitySold: "",
    pricePerUnit: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    let valid = true;

    if (!formData.quantitySold) {
      tempErrors.quantitySold = "quantity sold is required";
      valid = false;
    }

    if (!formData.pricePerUnit) {
      tempErrors.pricePerUnit = "price per unit is required";
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Sell Crop</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Quantity Sold
                </label>
                <input
                  type="number"
                  name="quantitySold"
                  value={formData.quantitySold}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  className={`w-full p-2 border rounded-md ${
                    errors.quantitySold ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.quantitySold && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.quantitySold}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price Per Unit</label>
                <input
                  type="number"
                  name="pricePerUnit"
                  value={formData.pricePerUnit}
                  onChange={handleChange}
                  placeholder="Enter price per unit"
                  className={`w-full p-2 border rounded-md ${
                    errors.pricePerUnit ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.pricePerUnit && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pricePerUnit}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellModal;
