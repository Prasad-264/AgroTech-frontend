import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FarmerDetails from "./FarmerDetails";
import Notification from "./Notification";
import CropModal from "./modal/CropModal";
import Loader from "../utils/Loader";

const Crop = () => {
  const { farmerId } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [crops, setCrops] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCrops();
  }, [farmerId]);

  const fetchCrops = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:6001/api/crop/${farmerId}/crops`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const crops = await response.json();
  
      // Fetch cost for each crop
      const cropsWithCost = await Promise.all(
        crops?.map(async (crop) => {
          const costResponse = await fetch(
            `http://localhost:6001/api/crop/${crop._id}/get-cropcost`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const totalCost = await costResponse.json();
          return {
            ...crop,
            totalCost,
          };
        })
      );
      setCrops(cropsWithCost);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

	const handleAddCrop = async (newCrop) => {
		try {
      const response = await fetch(
        `http://localhost:6001/api/crop/${farmerId}/add-crop`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCrop),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add crop");
      }

      fetchCrops();
      setIsAddModalOpen(false);
      setShowNotification(true);
      setNotificationMessage("Crop Added Successfully!");
    } catch (error) {
      console.error("Failed to add new crop:", error);
    }
	}

	const handleEditCrop = async (updatedCrop) => {
		try {
      const response = await fetch(
        `http://localhost:6001/api/crop/${selectedCrop?._id}/update-crop`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCrop),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update crop");
      }
      const editedCrop = await response.json();

      const updatedCrops = crops.map((crop) =>
        crop._id === editedCrop?.crop?._id ? editedCrop?.crop : crop
      );

      setCrops(updatedCrops);
      setIsEditModalOpen(false);
      setSelectedCrop(null);
      setShowNotification(true);
      setNotificationMessage("Crop Updated Successfully!");
    } catch (error) {
      console.error("Failed to update crop:", error);
    }
	}

  const handleDelete = async (cropId) => {
    try {
      const response = await fetch(
        `http://localhost:6001/api/crop/${farmerId}/${cropId}/delete-crop`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete crop");
      }

      setCrops((prevCrops) => prevCrops.filter((crop) => crop._id !== cropId));

      setShowNotification(true);
      setNotificationMessage("Crop Deleted Successfully!");
    } catch (error) {
      console.error("Failed to delete crop:", error);
    }
  };

	const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

	const toggleEditModal = (crop) => {
    setSelectedCrop(crop);		
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleClose = () => {
    setShowNotification(false);
  };

  const handleChemicals = (cropId) => {
    navigate(`/chemical/${cropId}`);
  }

  const handleSell = (cropId) => {
    navigate(`/sell/${cropId}`);
  }

  if (error) return <div>Error..!!</div>;
  if (loading) return <Loader /> ;

  return (
    <div className="mx-auto px-6 bg-white">
      <h1 className="text-4xl font-bold text-gray-900 text-center m-4">
        Farmer's Details
      </h1>
      <FarmerDetails farmerId={farmerId} />
      <div className="flex justify-center m-4">
        <button
          onClick={toggleAddModal}
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2"
        >
          Add Crop
        </button>
      </div>
      <div className="overflow-scroll no-scrollbar rounded-lg shadow-lg">
        <table className="min-w-full bg-white text-left">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-5">Id</th>
              <th className="py-3 px-5">Crop Name</th>
              <th className="py-3 px-5">Category</th>
              <th className="py-3 px-5">Season</th>
              <th className="py-3 px-5">Expense</th>
              <th className="py-3 px-5">Agrochemicals</th>
              <th className="py-3 px-5">Sell Crop</th>
              <th className="py-3 px-5">Action</th>
            </tr>
          </thead>
          <tbody>
            {crops.map((crop) => (
              <tr
                key={crop._id}
                className="bg-white border-b hover:bg-gray-200 transition-colors"
              >
                <td className="py-4 px-5">
                  <b>{crop._id}</b>
                </td>
                <td className="py-4 px-5">{crop.cropName}</td>
                <td className="py-4 px-5">{crop.category}</td>
                <td className="py-4 px-5">{crop.season}</td>
                <td className="py-4 px-5">₹ {crop?.totalCost?.cost || 0}</td>
                <td className="py-4 px-5">
                  <button
                    onClick={() => handleChemicals(crop._id)}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
                  >
                    Manage
                  </button>
                </td>
                <td className="py-4 px-5">
                  <button
                    onClick={() => handleSell(crop._id)}
                    className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
                  >
                    Sell
                  </button>
                </td>
                <td className="py-4 px-5 flex space-x-3">
                  <button
                    onClick={() => toggleEditModal(crop)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(crop._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <CropModal
          isOpen={isAddModalOpen}
          onClose={toggleAddModal}
          onSubmit={handleAddCrop}
        />

        {selectedCrop && (
          <CropModal
            isOpen={isEditModalOpen}
            onClose={() => toggleEditModal(null)}
            isEdit={true}
            cropData={selectedCrop}
            onSubmit={handleEditCrop}
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

export default Crop;
