import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from './GoogleLoginButton';
import { User } from '../Types';
import MicrosoftLoginButton from './MicrosoftLogin';
import FacebookLogin from './facebook';
import TwitterLogin from './twitter';

const Login: React.FC<{ setUser: React.Dispatch<React.SetStateAction<User | null>> }> = ({ setUser }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white flex flex-col gap-2 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
            <GoogleLoginButton setUser={setUser} />
          </GoogleOAuthProvider>
          <MicrosoftLoginButton setUser={setUser} />
          <FacebookLogin/>
          <TwitterLogin/>
        </div>
      </div>
    </div>
  );
};

export default Login;
