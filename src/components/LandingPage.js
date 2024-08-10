import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center relative"
      style={{ backgroundImage:"url('https://png.pngtree.com/thumb_back/fw800/background/20240610/pngtree-concept-use-of-the-smart-farmer-system-came-to-help-analysis-image_15746625.jpg')", }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 text-center text-white p-4 rounded-lg max-w-30">
        <h1 className="text-5xl font-bold">Welcome to AgroTech!</h1>
        <p className="text-xl mt-4">
          Your go-to platform for Empowering farmers, enriching yields, one
          click at a time. 🚜🌱
        </p>
        <div className="mt-8">
          <Link
            to="/signup"
            className="bg-blue-500 py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300 mx-2 inline-block"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-gray-700 py-3 px-6 rounded-full hover:bg-gray-800 transition duration-300 mx-2 inline-block"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
