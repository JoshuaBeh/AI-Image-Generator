import React, { useEffect, useState } from 'react';
import Home from './pages/home';
import jwtDecode from 'jwt-decode';
import AppContext from './lib/app-context';
import GeneratedImage from './pages/generated-Image';
import parseRoute from './lib/parse-route';
import SignInPage from './pages/sign-in-page';
import SignUpPage from './pages/sign-up-page';
export default function App() {
  const [user, setUser] = useState();
  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const [src, setSrc] = useState('');
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('Small');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = window.localStorage.getItem('react-context-jwt');
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
    window.localStorage.setItem('react-context-jwt', token);
    setUser(user);
  }

  function handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    setUser(undefined);
  }

  function renderPage() {
    if (route.path === '') {
      return <Home setSrc={setSrc} prompt={prompt} setPrompt={setPrompt} size={size} setSize={setSize} />;
    }
    if (route.path === 'temp') {
      return <GeneratedImage src={src} setSrc={setSrc} prompt={prompt} setPrompt={setPrompt} size={size} />;
    }
    if (route.path === 'sign-in') {
      return <SignInPage username={username} setUsername={setUsername} password={password} setPassword={setPassword} />;
    }
    if (route.path === 'sign-up') {
      return <SignUpPage username={username} setUsername={setUsername} password={password} setPassword={setPassword} />;
    }
  }

  const contextValue = { user, handleSignIn, handleSignOut };
  return (
    <AppContext.Provider value={contextValue}>
      { renderPage() }
    </AppContext.Provider>
  );
}
