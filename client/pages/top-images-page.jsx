import React, { useContext } from 'react';
import AppContext from '../lib/app-context';
import TopImages from '../components/top-images';

export default function TopImagesPage() {
  const { user } = useContext(AppContext);

  return (
    <div className='container'>
      <TopImages user={user} />
    </div>
  );
}
