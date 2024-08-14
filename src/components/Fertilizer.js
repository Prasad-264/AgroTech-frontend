import React, { useState, useEffect} from 'react';
import Notification from './Notification';
import ChemicalModal from './modal/ChemicalModal';

const Fertilizer = ({ cropId }) => {
	const [fertilizers, setFertilizers] = useState([]);
	const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFertilizer, setSelectedFertilizer] = useState(null);

	useEffect(() => {
    fetchFertilizers();
  }, [cropId]);

  const fetchFertilizers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:6001/api/crop/${cropId}/fertilizers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setFertilizers(data);			
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

	const handleAddFertilizer = async (newFertilizer) => {
		try {
      const response = await fetch(
        `http://localhost:6001/api/crop/${cropId}/add-fertilizer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newFertilizer),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add fertilizer");
      }

      fetchFertilizers();
      setIsAddModalOpen(false);
      setShowNotification(true);
      setNotificationMessage("Fertilizer Added Successfully!");
    } catch (error) {
      console.error("Failed to add new fertilizer:", error);
    }
	}

	const handleEditFertilizer = async (updatedFertilizer) => {
		try {
      const response = await fetch(
        `http://localhost:6001/api/crop/${selectedFertilizer?._id}/update-fertilizer`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFertilizer),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update fertilizer");
      }
      const editedFertilizer = await response.json();

      const updatedFertilizers = fertilizers.map((fertilizer) =>
        fertilizer._id === editedFertilizer?.fertilizer?._id ? editedFertilizer?.fertilizer : fertilizer
      );

      setFertilizers(updatedFertilizers);
      setIsEditModalOpen(false);
      setSelectedFertilizer(null);
      setShowNotification(true);
      setNotificationMessage("Fertilizer Updated Successfully!");
    } catch (error) {
      console.error("Failed to update fertilizer:", error);
    }
	}

  const handleDelete = async (fertilizerId) => {
    try {
      const response = await fetch(
        `http://localhost:6001/api/crop/${cropId}/${fertilizerId}/delete-fertilizer`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete fertilizer");
      }

      setFertilizers((prevFertilizers) => prevFertilizers.filter((fertilizer) => fertilizer._id !== fertilizerId));

      setShowNotification(true);
      setNotificationMessage("Fertilizer Deleted Successfully!");
    } catch (error) {
      console.error("Failed to delete fertilizer:", error);
    }
  };

	const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

	const toggleEditModal = (fertilizer) => {
    setSelectedFertilizer(fertilizer);		
    setIsEditModalOpen(!isEditModalOpen);
  };

	const handleClose = () => {
    setShowNotification(false);
  };

	if (error) return <div>Error..!!</div>;
  if (loading) return <div>Loading..!!</div>;

  return (
    <div className="mx-auto px-6 bg-white">
      <div className="flex justify-center m-4">
        <button
          onClick={toggleAddModal}
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2"
        >
          Add Fertilizer
        </button>
      </div>
      <div className="overflow-scroll no-scrollbar rounded-lg shadow-lg">
        <table className="min-w-full bg-white text-left">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-5">Id</th>
              <th className="py-3 px-5">Name</th>
              <th className="py-3 px-5">Manufacturer</th>
              <th className="py-3 px-5">Quantity</th>
              <th className="py-3 px-5">Cost</th>
              <th className="py-3 px-5">Description</th>
              <th className="py-3 px-5">Action</th>
            </tr>
          </thead>
          <tbody>
            {fertilizers.map((fertilizer) => (
              <tr
                key={fertilizer._id}
                className="bg-white border-b hover:bg-gray-200 transition-colors"
              >
                <td className="py-4 px-5">
                  <b>{fertilizer._id}</b>
                </td>
                <td className="py-4 px-5">{fertilizer.name}</td>
                <td className="py-4 px-5">{fertilizer.manufacturer}</td>
                <td className="py-4 px-5">{fertilizer.quantity}</td>
                <td className="py-4 px-5">{fertilizer.cost}</td>
                <td className="py-4 px-5">{fertilizer.description}</td>
                <td className="py-4 px-5 flex space-x-3">
                  <button
                    onClick={() => toggleEditModal(fertilizer)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(fertilizer._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ChemicalModal
          isOpen={isAddModalOpen}
          onClose={toggleAddModal}
          onSubmit={handleAddFertilizer}
        />

        {selectedFertilizer && (
          <ChemicalModal
            isOpen={isEditModalOpen}
            onClose={() => toggleEditModal(null)}
            isEdit={true}
            chemicalData={selectedFertilizer}
            onSubmit={handleEditFertilizer}
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
  )
}

export default Fertilizer;