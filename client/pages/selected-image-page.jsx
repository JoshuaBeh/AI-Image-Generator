import React, { useContext } from 'react';
import SelectedImage from '../components/selected-image';
import AppContext from '../lib/app-context';

export default function SelectedImagePage({ imageId }) {
  const { user } = useContext(AppContext);

  return (
    <div className='container'>
      <SelectedImage imageId={imageId} user={user} />
    </div>
  );
}
