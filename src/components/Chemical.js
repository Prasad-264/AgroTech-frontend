import React from 'react';
import { useParams } from 'react-router-dom';
import CropDetails from './CropDetails';
import Fertilizer from './Fertilizer';
import Pesticide from './Pesticide';

const Chemical = () => {
  const { cropId } = useParams();
  
  return (
    <div className="mx-auto px-6 pb-6 bg-white">
      <h1 className="text-4xl font-bold text-gray-900 text-center m-4">
        Crop Details
      </h1>
      <CropDetails cropId={cropId} />
      <h1 className="text-3xl font-semibold text-gray-800 text-center m-4">
        Manage fertilizers and pesticides for this crop
      </h1>
      <Fertilizer cropId={cropId} />
      <Pesticide cropId={cropId} />
    </div>
  )
}

export default Chemical;