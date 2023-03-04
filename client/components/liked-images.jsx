/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';

export default function LikedImages({ user }) {
  const [images, setImages] = useState('');
  const { userId } = user || 0;
  useEffect(() => {
    fetch(`/images/mylikes/${userId}`)
      .then(response => response.json())
      .then(data => {
        setImages(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [userId]);
  console.log(images);
  return (
    <>
      <div className='row center'>
        <h1 className='green'>My Likes</h1>
      </div>
      <div className='row-flex-wrap'>
        <p>hi</p>
      </div>
    </>
  );
}
