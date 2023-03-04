import React, { useContext } from 'react';
import Navbar from '../components/navbar';
import MobileNavbar from '../components/mobileNavbar';
import AppContext from '../lib/app-context';
import LikedImages from '../components/liked-images';

export default function LikedImagesPage() {
  const { user } = useContext(AppContext);

  return (
    <div className='container'>
      <Navbar />
      <LikedImages user={user} />
      <MobileNavbar />
    </div>
  );
}
