import React, { useState, useEffect } from 'react';
import './App.css';
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme
} from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

import Wilson from './packages/Wilson/Wilson';
import PreAuth from './packages/PreAuth/PreAuth';

export default function App() {
  
  // COLOR SCHEMES
  // sets the preferred color scheme set in a visitors media query.
  const preferredColorScheme = useColorScheme();
  // sets the color scheme in state.
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);

  // confirms when the app is mounted that the proper color scheme is set.
  useEffect(() => {
    setColorScheme(preferredColorScheme)
  }, [preferredColorScheme]);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  // AUTHENTICATION
  // handles the login flag, checking if a user is fully authenticated.
  const [loggedIn, setLoggedIn] = useState(false);
  // checks localStorage for a user token every time app is rendered
  useEffect(() => {
    let token = localStorage.getItem('wilsonUserToken')
    if (token !== null ) {
      setLoggedIn(true)
    }
  }, [loggedIn]);
  // removes the token from local storage and sets the login flag to false.
  const logout = () => {
    localStorage.removeItem('wilsonUserToken')
    setLoggedIn(false)
  }

  const renderContent = (loggedIn: boolean) => {
    if (loggedIn) {
        return (
            <Wilson
                logout={logout}
            />
        )
    } else {
        return (
            <PreAuth 
                setLoggedIn={setLoggedIn}
            />
        )
    }
}

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        {renderContent(loggedIn)}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}