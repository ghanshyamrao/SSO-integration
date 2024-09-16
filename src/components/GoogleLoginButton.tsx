import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { User } from '../Types';

const GoogleLoginButton: React.FC<{ setUser: React.Dispatch<React.SetStateAction<User | null>> }> = ({ setUser }) => {
  const login = useGoogleLogin({
    onSuccess: response => {
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          setUser({
            accessToken: response.access_token,
            data,
            name: data.name,
            email: data.email,
            picture: data.picture,
          });
        })
        .catch(err => console.log('Google Login Failed:', err));
    },
    onError: () => console.log('Google Login Failed'),
  });

  return (
    <button
      onClick={() => login()}
      className="w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition ease-in-out duration-150"
    >
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;
