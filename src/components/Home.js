import React, { useState } from "react";
import AddFarmerModal from "./modal/AddFarmerModal";
import { getData } from "../utils/storage";

const Home = () => {
  const [farmers, setFarmers] = useState([
    {
      name: "John Doe",
      email: "john@example.com",
      contactNumber: "9876543210",
      address: "123 Farm Lane",
      farm_type: "Dairy",
      expense: "$5000",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      contactNumber: "8765432109",
      address: "456 Country Road",
      farm_type: "Vegetable",
      expense: "$3000",
    },
    // Add more sample farmers if needed
  ]);
  const userId = getData("userId");
  console.log(userId);
  
  const handleEdit = (index) => {
    console.log(`Edit farmer at index ${index}`);
    // Implement edit functionality here
  };

  const handleDelete = (index) => {
    const updatedFarmers = farmers.filter((_, i) => i !== index);
    setFarmers(updatedFarmers);
  };

  return (
    <div className="mx-auto p-6 bg-gradient-to-r from-sky-400 to-indigo-400 min-h-screen">
      <div className="flex justify-center">
        <AddFarmerModal userId={userId} />
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
            {farmers.map((farmer, index) => (
              <tr
              key={index}
              className="bg-white border-b hover:bg-gray-200 transition-colors"
              >
                <td className="py-4 px-5"><b>{index}</b></td>
                <td className="py-4 px-5"><b>{farmer.name}</b></td>
                <td className="py-4 px-5">{farmer.email}</td>
                <td className="py-4 px-5">{farmer.contactNumber}</td>
                <td className="py-4 px-5">{farmer.address}</td>
                <td className="py-4 px-5">{farmer.farm_type}</td>
                <td className="py-4 px-5">{farmer.expense}</td>
                <td className="py-4 px-5 flex space-x-3">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                    >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
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
    </div>
  );
};

export default Home;
