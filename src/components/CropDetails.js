import React,{ useState, useEffect } from 'react'

const CropDetails = ({ cropId }) => {
  const [crop, setCrop] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCropDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:6001/api/crop/${cropId}/get-crop`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setCrop(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchCropDetails();
  }, [cropId]);

  if (error) return <div>Error..!!</div>;
  if (loading) return <div>Loading..!!</div>;

  return (
    <div className="mx-auto max-w-3xl px-8 py-6 flex flex-row space-x-4 justify-between items-center shadow-lg rounded-lg overflow-hidden bg-gradient-to-r from-green-200 to-blue-200 hover:from-green-300 hover:to-blue-300">
      <div className="flex items-center gap-4">
        <div className="font-semibold">
          <p className="font-semibold text-center text-gray-800">Crop Name</p>
          <div className="text-lg text-gray-900 text-center">{crop?.cropName}</div>
        </div>
      </div>
      <div className="text-gray-700">
        <p className="font-semibold text-center text-gray-800">Season</p>
        <p className="text-center text-lg">{crop?.season}</p>
      </div>
      <div className="text-gray-700">
        <p className="font-semibold text-center text-gray-800">Category</p>
        <p className="text-center text-lg">{crop?.category}</p>
      </div>
    </div>
  )
}

export default CropDetails;