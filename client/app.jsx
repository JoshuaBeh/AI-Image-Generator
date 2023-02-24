import React, { useEffect, useState } from 'react';
import Home from './pages/home';
import GeneratedImage from './pages/generated-Image';
import parseRoute from './lib/parse-route';
export default function App() {
  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const [src, setSrc] = useState('');

  useEffect(() => {
    function handleHashChange(event) {
      setRoute(parseRoute(window.location.hash));
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  function renderPage() {
    if (route.path === '') {
      return <Home setSrc={setSrc} src={src}/>;
    }
    if (route.path === 'temp') {
      return <GeneratedImage src={src} setSrc={setSrc}/>;
    }
  }

  return (
    <>
      { renderPage() }
    </>
  );
}
