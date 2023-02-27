import React, { useContext } from 'react';
import Navbar from '../components/navbar';
import MobileNavbar from '../components/mobileNavbar';
import AppContext from '../lib/app-context';

export default function AllImagesPage() {
  // eslint-disable-next-line no-unused-vars
  const { user } = useContext(AppContext);

  return (
    <div className='container'>
      <Navbar />
      <MobileNavbar />
    </div>
  );
}
