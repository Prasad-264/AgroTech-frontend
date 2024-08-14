import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FarmerDetails from "./FarmerDetails";

const Crop = () => {
  const { farmerId } = useParams();
  const [farmer, setFarmer] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    fetchFarmerDetails();
    fetchCrops();
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
      const data = await response.json();
      setCrops(data);
      console.log(data);

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  if (error) return <div>Error..!!</div>;
  if (loading) return <div>Loading..!!</div>;

  return (
    <div className="mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-gray-900 text-center pb-4">
        Farmer's Details
      </h1>
      <FarmerDetails farmer={farmer} />
    </div>
  );
};

export default Crop;