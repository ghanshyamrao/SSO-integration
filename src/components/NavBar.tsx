// src/components/NavBar.tsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.name}</p>
          {/* <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button> */}
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
    </nav>
  );
};

export default NavBar;
