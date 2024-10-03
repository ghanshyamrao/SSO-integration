import React, { useState } from "react";
import { LoginSocialFacebook } from "reactjs-social-login";
import { Facebook, LucideFacebook } from "lucide-react";

interface FacebookUser {
  name: string;
  email: string;
  picture: {
    data: {
      url: string;
    };
  };
}

const FacebookLogin: React.FC = () => {
  const [user, setUser] = useState<FacebookUser | null>(null);

  const handleLoginSuccess = (response: any) => {
    console.log("Facebook login success:", response);
    setUser(response.data);
  };

  const handleLoginFailure = (error: any) => {
    console.error("Facebook login failed:", error);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      {!user ? (
        <LoginSocialFacebook
          appId={process.env.REACT_APP_FACEBOOK_APP_ID || ""}
          onResolve={handleLoginSuccess}
          onReject={handleLoginFailure}
        >
          <button className="login-button login-button--facebook">
            <Facebook color="white" size={24} />
            <p className="ml-4">Login with Facebook</p>
          </button>
        </LoginSocialFacebook>
      ) : (
        <div style={styles.profileContainer}>
          <img
            src={user.picture.data.url}
            alt={user.name}
            style={styles.profileImage}
          />
          <h2 style={styles.name}>{user.name}</h2>
          <p style={styles.email}>{user.email}</p>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  loginButton: {
    width: "250px",
    fontSize: "16px",
  },
  profileContainer: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center" as const,
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  name: {
    fontSize: "24px",
    fontWeight: "bold" as const,
    margin: "10px 0",
  },
  email: {
    fontSize: "16px",
    color: "#65676b",
    marginBottom: "20px",
  },
  logoutButton: {
    backgroundColor: "#1877f2",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default FacebookLogin;
