import React, { useState, useEffect} from 'react';
import Notification from './Notification';
import ChemicalModal from './modal/ChemicalModal';

const Pesticide = ({ cropId }) => {
	const [pesticides, setPesticides] = useState([]);
	const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPesticide, setSelectedPesticide] = useState(null);

	useEffect(() => {
    fetchPesticides();
  }, [cropId]);

  const fetchPesticides = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:6001/api/crop/${cropId}/pesticides`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setPesticides(data);			
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

	const handleAddPesticide = async (newPesticide) => {
		try {
      const response = await fetch(
        `http://localhost:6001/api/crop/${cropId}/add-pesticide`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPesticide),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add pesticide");
      }

      fetchPesticides();
      setIsAddModalOpen(false);
      setShowNotification(true);
      setNotificationMessage("Pesticide Added Successfully!");
    } catch (error) {
      console.error("Failed to add new pesticide:", error);
    }
	}

	const handleEditPesticide = async (updatedPesticide) => {
		try {
      const response = await fetch(
        `http://localhost:6001/api/crop/${selectedPesticide?._id}/update-pesticide`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPesticide),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update pesticide");
      }
      const editedPesticide = await response.json();

      const updatedPesticides = pesticides.map((pesticide) =>
        pesticide._id === editedPesticide?.pesticide?._id ? editedPesticide?.pesticide : pesticide
      );

      setPesticides(updatedPesticides);
      setIsEditModalOpen(false);
      setSelectedPesticide(null);
      setShowNotification(true);
      setNotificationMessage("Pesticide Updated Successfully!");
    } catch (error) {
      console.error("Failed to update pesticide:", error);
    }
	}

  const handleDelete = async (pesticideId) => {
    try {
      const response = await fetch(
        `http://localhost:6001/api/crop/${cropId}/${pesticideId}/delete-pesticide`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete pesticide");
      }

      setPesticides((prevPesticides) => prevPesticides.filter((pesticide) => pesticide._id !== pesticideId));

      setShowNotification(true);
      setNotificationMessage("Pesticide Deleted Successfully!");
    } catch (error) {
      console.error("Failed to delete pesticide:", error);
    }
  };

	const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

	const toggleEditModal = (pesticide) => {
    setSelectedPesticide(pesticide);		
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
          Add Pesticide
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
            {pesticides.map((pesticide) => (
              <tr
                key={pesticide._id}
                className="bg-white border-b hover:bg-gray-200 transition-colors"
              >
                <td className="py-4 px-5">
                  <b>{pesticide._id}</b>
                </td>
                <td className="py-4 px-5">{pesticide.name}</td>
                <td className="py-4 px-5">{pesticide.manufacturer}</td>
                <td className="py-4 px-5">{pesticide.quantity}</td>
                <td className="py-4 px-5">{pesticide.cost}</td>
                <td className="py-4 px-5">{pesticide.description}</td>
                <td className="py-4 px-5 flex space-x-3">
                  <button
                    onClick={() => toggleEditModal(pesticide)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pesticide._id)}
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
          onSubmit={handleAddPesticide}
          isPesticide={true}
        />

        {selectedPesticide && (
          <ChemicalModal
            isOpen={isEditModalOpen}
            onClose={() => toggleEditModal(null)}
            isEdit={true}
            chemicalData={selectedPesticide}
            onSubmit={handleEditPesticide}
            isPesticide={true}
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

export default Pesticide;