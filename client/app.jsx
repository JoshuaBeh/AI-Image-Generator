import React, { useEffect, useState } from 'react';
import Home from './pages/home';
import jwtDecode from 'jwt-decode';
import AppContext from './lib/app-context';
import GeneratedImage from './pages/generated-Image';
import parseRoute from './lib/parse-route';
import SignInPage from './pages/sign-in-page';
import SignUpPage from './pages/sign-up-page';
import AllImagesPage from './pages/all-images-page';
import SelectedImagePage from './pages/selected-image-page';
export default function App() {
  const [user, setUser] = useState();
  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const [src, setSrc] = useState('');
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('Small');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currImage, setCurrImage] = useState();

  useEffect(() => {
    const token = window.localStorage.getItem('user-token');
    const user = token ? jwtDecode(token) : null;
    setUser(user);
    function handleHashChange(event) {
      setRoute(parseRoute(window.location.hash));
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  function handleSignIn(data) {
    const { user, token } = data;
    window.localStorage.setItem('user-token', token);
    setUser(user);
  }

  function handleSignOut() {
    window.localStorage.removeItem('user-token');
    setUser(undefined);
  }

  function renderPage() {
    const { path } = route;
    if (path === '') {
      return <Home />;
    }
    if (path === 'temp') {
      return <GeneratedImage />;
    }
    if (path === 'sign-in') {
      return <SignInPage />;
    }
    if (path === 'sign-up') {
      return <SignUpPage />;
    }
    if (path === 'all-images') {
      return <AllImagesPage />;
    }
    if (path === 'images') {
      const imageId = route.params.get('imageId');
      return <SelectedImagePage imageId={imageId}/>;
    }
  }

  const contextValue = { user, handleSignIn, handleSignOut, src, setSrc, size, setSize, prompt, setPrompt, username, setUsername, password, setPassword, currImage, setCurrImage };
  return (
    <AppContext.Provider value={contextValue}>
      { renderPage() }
    </AppContext.Provider>
  );
}
