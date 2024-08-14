import React, { useState, useEffect } from 'react';

const FarmerDetails = ({ farmerId }) => {
  const [farmer, setFarmer] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFarmerDetails();
  }, [farmerId]);

  const fetchFarmerDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:6001/api/farmer/${farmerId}/get-farmer`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setFarmer(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  if (error) return <div>Error..!!</div>;
  if (loading) return <div>Loading..!!</div>;
  return (
    <div className="mx-auto max-w-5xl px-8 py-6 flex flex-row space-x-4 justify-between items-center shadow-lg rounded-lg overflow-hidden bg-gradient-to-r from-green-200 to-blue-200 hover:from-green-300 hover:to-blue-300">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 overflow-hidden bg-gray-200 rounded-full border-4 border-green-500">
          <svg className="absolute w-16 h-16 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
          </svg>
        </div>
        <div className="font-semibold">
          <div className="text-lg text-gray-900">{farmer.name}</div>
          <div className="text-sm text-gray-600">{farmer.email}</div>
        </div>
      </div>
      <div className="text-gray-700">
        <p className="font-semibold text-center text-gray-800">Address</p>
        <p className="text-center">{farmer.address}</p>
      </div>
      <div className="text-gray-700">
        <p className="font-semibold text-center text-gray-800">Contact Number</p>
        <p className="text-center">{farmer.contactNumber}</p>
      </div>
      <div className="text-gray-700">
        <p className="font-semibold text-center text-gray-800">Farm Type</p>
        <p className="text-center">{farmer.farm_type}</p>
      </div>
    </div>
  )
};

export default FarmerDetails;