import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CropDetails from "./CropDetails";
import Loader from "../utils/Loader";
import SellModal from "./modal/SellModal";

const Sell = () => {
  const { cropId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [avgPricePerUnit, setAvgPricePerUnit] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchTransactions();
  }, [cropId]);

  useEffect(() => {
    if (transactions.length > 0) {
      const totalQty = transactions.reduce((sum, transaction) => sum + transaction.quantitySold, 0);
      const totalRev = transactions.reduce((sum, transaction) => sum + (transaction.quantitySold * transaction.pricePerUnit), 0);
      const avgPrice = totalRev / totalQty;

      setTotalQuantity(totalQty);
      setTotalRevenue(totalRev);
      setAvgPricePerUnit(avgPrice);
    }
  }, [transactions]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:6001/api/crop/${cropId}/get-transactions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setTransactions(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleSellCrop = async (newSell) => {
    try {
      const response = await fetch(
        `http://localhost:6001/api/crop/${cropId}/sell-crop`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newSell),
        }
      );

      if (!response.ok) {
        throw new Error("failed to sell crop");
      }

      fetchTransactions();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add new crop:", error);
    }
  };

  const toggleSell = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (error) return <div>Error..!!</div>;
  if (loading) return <Loader />;

  return (
    <div className="mx-auto px-6 bg-white">
      <div className="py-4">
        <CropDetails cropId={cropId} />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 text-center m-4">
        Financial Summary
      </h1>
      <div className="flex justify-center m-4">
        <button
          onClick={toggleSell}
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2"
        >
          Sell Crop
        </button>
      </div>
      <div className="overflow-scroll no-scrollbar rounded-lg shadow-lg">
        <table className="min-w-full bg-white text-left">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-5">Sale Id</th>
              <th className="py-3 px-5">Date</th>
              <th className="py-3 px-5">Quantity sold</th>
              <th className="py-3 px-5">Price per unit</th>
              <th className="py-3 px-5">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction._id}
                className="bg-white border-b hover:bg-gray-200 transition-colors"
              >
                <td className="py-4 px-5">
                  <b>{transaction._id}</b>
                </td>
                <td className="py-4 px-5">{new Date(transaction.saleDate).toLocaleDateString()}</td>
                <td className="py-4 px-5">{transaction.quantitySold}</td>
                <td className="py-4 px-5">₹ {transaction.pricePerUnit}</td>
                <td className="py-4 px-5">₹ {transaction.quantitySold * transaction.pricePerUnit}</td>
              </tr>
            ))}
            <tr className="bg-gray-100 font-bold">
              <td className="py-4 px-5">Total</td>
              <td className="py-4 px-5"></td>
              <td className="py-4 px-5">{totalQuantity}</td>
              <td className="py-4 px-5">₹ {avgPricePerUnit.toFixed(2)}</td>
              <td className="py-4 px-5">₹ {totalRevenue.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <SellModal
          isOpen={isModalOpen}
          onClose={toggleSell}
          onSubmit={handleSellCrop}
        />        
      </div>
    </div>
  );
};

export default Sell;