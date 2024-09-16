// src/AuthProvider.tsx
import { Auth0Provider } from '@auth0/auth0-react';
import React, { FC } from 'react';
import {useNavigate } from 'react-router-dom';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const history = useNavigate();

  const domain = process.env.REACT_APP_AUTH0_DOMAIN || '';
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || '';

  const onRedirectCallback = (appState: any) => {
    history('/')
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      // redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
