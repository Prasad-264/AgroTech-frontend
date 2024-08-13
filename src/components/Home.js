/* eslint-disable */
import React, { useEffect, useState } from "react";
import AddFarmerModal from "./modal/AddFarmerModal";
import { getData } from "../utils/storage";
import Notification from "./Notification";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [farmers, setFarmers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const userId = getData("userId");
  const navigate = useNavigate();

  const fetchFarmerData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:6001/api/farmer/${userId}/farmers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setFarmers(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmerData();
  }, [userId]);

  const handleAddFarmer = async (newFarmer) => {
    try {
      const response = await fetch(
        `http://localhost:6001/api/farmer/${userId}/add-farmer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newFarmer),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add farmer");
      }

      fetchFarmerData();
      setIsAddModalOpen(false);
      setShowNotification(true);
      setNotificationMessage("Farmer Added Successfully!");
    } catch (error) {
      console.error("Failed to add new farmer:", error);
    }
  };

  const handleEditFarmer = async (updatedFarmer) => {
    try {
      const response = await fetch(
        `http://localhost:6001/api/farmer/${selectedFarmer?._id}/update-farmer`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFarmer),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update farmer");
      }
      const editedFarmer = await response.json();

      const updatedFarmers = farmers.map((farmer) =>
        farmer._id === editedFarmer?.farmer?._id ? editedFarmer?.farmer : farmer
      );

      setFarmers(updatedFarmers);
      setIsEditModalOpen(false);
      setSelectedFarmer(null);
      setShowNotification(true);
      setNotificationMessage("Farmer Updated Successfully!");
    } catch (error) {
      console.error("Failed to update farmer:", error);
    }
  };

  const handleDelete = async (farmerId) => {
    try {
      const response = await fetch(
        `http://localhost:6001/api/farmer/${userId}/${farmerId}/delete-farmer`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete farmer");
      }

      setFarmers((prevFarmers) =>
        prevFarmers.filter((farmer) => farmer._id !== farmerId)
      );

      setShowNotification(true);
      setNotificationMessage("Farmer Deleted Successfully!");
    } catch (error) {
      console.error("Failed to delete farmer:", error);
    }
  };

  const handleCrop = (farmerId) => {
    navigate(`/crop/${farmerId}`);
  };

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const toggleEditModal = (farmer) => {
    setSelectedFarmer(farmer);
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleClose = () => {
    setShowNotification(false);
  };

  if (error) return <div>Error..!!</div>;
  if (loading) return <div>Loading..!!</div>;

  return (
    <div className="mx-auto p-6 bg-gradient-to-r from-sky-400 to-indigo-400 min-h-screen">
      <div className="flex justify-center">
        <button 
          onClick={toggleAddModal}
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Add Farmer
        </button>
      </div>
      <div className="overflow-scroll no-scrollbar rounded-lg shadow-lg">
        <table className="min-w-full bg-white text-left">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-5">Id</th>
              <th className="py-3 px-5">Name</th>
              <th className="py-3 px-5">Email</th>
              <th className="py-3 px-5">Mobile Number</th>
              <th className="py-3 px-5">Address</th>
              <th className="py-3 px-5">Farm Type</th>
              <th className="py-3 px-5">Crops</th>
              <th className="py-3 px-5">Action</th>
            </tr>
          </thead>
          <tbody>
            {farmers.map((farmer) => (
              <tr
                key={farmer._id}
                className="bg-white border-b hover:bg-gray-200 transition-colors"
              >
                <td className="py-4 px-5">
                  <b>{farmer._id}</b>
                </td>
                <td className="py-4 px-5">{farmer.name}</td>
                <td className="py-4 px-5">{farmer.email}</td>
                <td className="py-4 px-5">{farmer.contactNumber}</td>
                <td className="py-4 px-5">{farmer.address}</td>
                <td className="py-4 px-5">{farmer.farm_type}</td>
                <td className="py-4 px-5">
                  <button
                    onClick={() => handleCrop(farmer._id)}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
                  >
                    Manage Crop
                  </button>
                </td>
                <td className="py-4 px-5 flex space-x-3">
                  <button
                    onClick={() => toggleEditModal(farmer)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(farmer._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for adding a farmer */}
        <AddFarmerModal
          isOpen={isAddModalOpen}
          onClose={toggleAddModal}
          onSubmit={handleAddFarmer}
        />

        {/* Modal for editing a farmer */}
        {selectedFarmer && (
          <AddFarmerModal
            isOpen={isEditModalOpen}
            onClose={() => toggleEditModal(null)}
            isEdit={true}
            farmerData={selectedFarmer}
            onSubmit={handleEditFarmer}
          />
        )}
      </div>
      {showNotification && (
        <Notification
          message={notificationMessage}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default Home;