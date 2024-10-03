import React from "react";
import { useMsal } from "@azure/msal-react";
import { User, MicrosoftUserProfile } from "../Types"; // Import MicrosoftUserProfile
import { AppWindowIcon } from "lucide-react";

const MicrosoftLoginButton: React.FC<{
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}> = ({ setUser }) => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      const response = await instance.loginPopup({
        scopes: ["openid", "profile", "User.Read"],
      });

      const userResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
        headers: {
          Authorization: `Bearer ${response.accessToken}`,
        },
      });
      const data: MicrosoftUserProfile = await userResponse.json(); // Use MicrosoftUserProfile

      // Map data to MicrosoftUserProfile and update the User state
      setUser({
        accessToken: response.accessToken,
        data: {
          email: data.mail || data.userPrincipalName,
          email_verified: true, // Microsoft Graph typically verifies this internally
          family_name: data.surname || "",
          given_name: data.givenName || "",
          name: data.displayName,
          picture: "", // Microsoft Graph requires additional calls for profile picture
          sub: data.id,
        },
        name: data.displayName,
        email: data.mail || data.userPrincipalName,
        picture: "", // You might want to fetch the profile picture separately
      });
    } catch (error) {
      console.log("Microsoft Login Failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="login-button login-button--microsoft"
    >
      <AppWindowIcon color="white" size={24} />
      <p className="ml-4"> Login with Microsoft</p>
    </button>
  );
};

export default MicrosoftLoginButton;
