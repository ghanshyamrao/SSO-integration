import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { User } from "../Types";
import { Globe } from "lucide-react";

const GoogleLoginButton: React.FC<{
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}> = ({ setUser }) => {
  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response);
      fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser({
            accessToken: response.access_token,
            data,
            name: data.name,
            email: data.email,
            picture: data.picture,
          });
        })
        .catch((err) => console.log("Google Login Failed:", err));
    },
    onError: () => console.log("Google Login Failed"),
  });

  return (
    <button
      onClick={() => login()}
      className="login-button login-button--google"
    >
      <Globe color="white" size={24} />
      <p className="ml-4"> Login with Google</p>
    </button>
  );
};

export default GoogleLoginButton;
