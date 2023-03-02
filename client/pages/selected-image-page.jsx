import React from 'react';
import Navbar from '../components/navbar';
import MobileNavbar from '../components/mobileNavbar';
import SelectedImage from '../components/selected-image';

export default function SelectedImagePage({ imageId }) {

  return (
    <div className='container'>
      <Navbar />
      <SelectedImage imageId={imageId} />
      <MobileNavbar />
    </div>
  );
}
