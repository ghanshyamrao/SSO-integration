import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  path: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
