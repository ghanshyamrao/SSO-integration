import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../Types';
import { formatKey } from '../utils/utility';

const UserDetails: React.FC<{ user: User | null }> = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const userToken = user?.accessToken;
    if (userToken) {
      try {
        // Revoke the Google access token
        const response = await fetch(`https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(userToken)}`, {
          method: 'POST',
        });
        
        if (response.ok) {
          console.log('Google token revoked successfully');
        } else {
          console.error('Failed to revoke Google token:', response.statusText);
        }
      } catch (error) {
        console.error('Error revoking Google token:', error);
      }
    }

    // Clear user state and redirect to login page
    navigate('/');
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700">
          <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-150 ease-in-out"
        >
          Logout
        </button>
        <p className="text-xl">No user data available. Please login.</p>
      </div>
    );
  }

  // Extract data fields from user
  const { data } = user;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <div className="flex flex-col items-center">
          <img
            src={data.picture || '/default-avatar.png'} // Fallback image if no picture is available
            alt={data.name || 'User Avatar'}
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">{data.name || 'No Name'}</h2>
          <p className="text-gray-600">{data.email || 'No Email Provided'}</p>
          <span className={`text-sm ${data.email_verified ? 'text-green-600' : 'text-red-600'}`}>
            {data.email_verified ? 'Verified' : 'Not Verified'}
          </span>
        </div>

        <div className="mt-6 space-y-4">
        {Object.keys(data).map(key => {
            const value = (data as Record<string, any>)[key];
            return (
              <p key={key}>
                <strong>{formatKey(key)}:</strong> {value || 'Not Provided'}
              </p>
            );
          })}
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-150 ease-in-out"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
