import React, { useContext } from 'react';
import Navbar from '../components/navbar';
import MobileNavbar from '../components/mobileNavbar';
import SelectedImage from '../components/selected-image';
import AppContext from '../lib/app-context';

export default function SelectedImagePage({ imageId }) {
  const { currImage } = useContext(AppContext);

  return (
    <div className='container'>
      <Navbar />
      <SelectedImage currImage={currImage} imageId={imageId} />
      <MobileNavbar />
    </div>
  );
}
