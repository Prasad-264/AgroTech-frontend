import React, { useEffect, useState } from "react";
import AddFarmerModal from "./modal/AddFarmerModal";
import { getData } from "../utils/storage";
import Notification from "./Notification";

const Home = () => {
  const [farmers, setFarmers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const userId = getData("userId");

  const fetchFarmerData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:6001/api/farmer/${userId}/farmers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
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

  const handleEdit = (farmerId) => {
    console.log(`Edit farmer with id ${farmerId}`);
    // Implement edit functionality here
  };

  const handleDelete = async (farmerId) => {
    try {
      const response = await fetch(`http://localhost:6001/api/farmer/${userId}/${farmerId}/delete-farmer`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log('farmer removed successfully');
        setFarmers((prevFarmers) => prevFarmers.filter((farmer) => farmer._id !== farmerId));
        setShowNotification(true);
      } else {
        console.error('Failed to remove farmar');
      }
    } catch (error) {
      console.error("Failed to delete farmer:", error);
    }
  };

  const handleClose = () => {
    setShowNotification(false);
  }

  if (error) return <div>Error..!!</div>;
  if (loading) return <div>Loading..!!</div>;

  return (
    <div className="mx-auto p-6 bg-gradient-to-r from-sky-400 to-indigo-400 min-h-screen">
      <div className="flex justify-center">
        <AddFarmerModal userId={userId} onFarmerAdded={fetchFarmerData} />
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
              <th className="py-3 px-5">Expense</th>
              <th className="py-3 px-5">Action</th>
            </tr>
          </thead>
          <tbody>
            {farmers.map((farmer) => (
              <tr
                key={farmer._id}
                className="bg-white border-b hover:bg-gray-200 transition-colors"
              >
                <td className="py-4 px-5"><b>{farmer._id}</b></td>
                <td className="py-4 px-5">{farmer.name}</td>
                <td className="py-4 px-5">{farmer.email}</td>
                <td className="py-4 px-5">{farmer.contactNumber}</td>
                <td className="py-4 px-5">{farmer.address}</td>
                <td className="py-4 px-5">{farmer.farm_type}</td>
                <td className="py-4 px-5">{farmer.expense}</td>
                <td className="py-4 px-5 flex space-x-3">
                  <button
                    onClick={() => handleEdit(farmer._id)}
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
      </div>
      {showNotification && <Notification 
        message={"Farmer deleted successfully"}
        onClose={handleClose}
      />}
    </div>
  );
};

export default Home;