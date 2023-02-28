import React, { useState, useEffect } from 'react';

export default function SelectedImage({ imageId }) {
  const [image, setImage] = useState('');

  useEffect(() => {
    fetch(`/images/${imageId}`)
      .then(response => response.json())
      .then(data => setImage(data));
  }, [imageId]);

  const { src, prompt } = image;
  return (
    <div>
      <img src={`/images/${src}`} alt={prompt} />
      <h1>Prompt: {prompt}</h1>
    </div>
  );
}
