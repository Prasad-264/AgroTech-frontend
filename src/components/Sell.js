import React from 'react';
import { useParams } from 'react-router-dom';
import CropDetails from './CropDetails';

const Sell = () => {
  const { cropId } = useParams();
  
  return (
    <div>
      <CropDetails cropId={cropId} />
    </div>
  )
}

export default Sell;