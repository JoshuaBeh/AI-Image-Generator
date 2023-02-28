import React, { useContext } from 'react';
import Navbar from '../components/navbar';
import MobileNavbar from '../components/mobileNavbar';
import AppContext from '../lib/app-context';
import AllImages from '../components/all-images';

export default function AllImagesPage() {
  const { user } = useContext(AppContext);

  return (
    <div className='container'>
      <Navbar />
      <AllImages user={user}/>
      <MobileNavbar />
    </div>
  );
}
