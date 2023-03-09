import React, { useContext } from 'react';
import AppContext from '../lib/app-context';
import AllImages from '../components/all-images';

export default function AllImagesPage() {
  const { user } = useContext(AppContext);

  return (
    <div className='container'>
      <AllImages user={user} />
    </div>
  );
}
