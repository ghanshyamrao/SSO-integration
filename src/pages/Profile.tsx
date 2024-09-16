// src/pages/Profile.tsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile: React.FC = () => {
  const { user } = useAuth0();

  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default Profile;
