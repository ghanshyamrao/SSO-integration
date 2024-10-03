import { Twitter } from "lucide-react";
import React, { useState } from "react";
import { LoginSocialTwitter } from "reactjs-social-login";

interface TwitterUser {
  name: string;
  email: string;
  profile_image_url: string;
}

const TwitterLogin: React.FC = () => {
  const [user, setUser] = useState<TwitterUser | null>(null);

  const handleLoginSuccess = async (response: any) => {
    setUser(response.data);
    console.log("Twitter login success:", response);
  };

  const handleLoginFailure = (error: any) => {
    console.error("Twitter login failed:", error);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      {!user ? (
        <LoginSocialTwitter
          client_id={process.env.REACT_APP_TWITTER_V2_APP_KEY || ""}
          redirect_uri={window.location.origin}
          onResolve={handleLoginSuccess}
          onReject={handleLoginFailure}
        >
          <button className="login-button login-button--twitter">
            <Twitter color="white" size={24} />
            <p className="ml-4"> Login with Twitter</p>
          </button>
        </LoginSocialTwitter>
      ) : (
        <div style={styles.profileContainer}>
          <img
            src={user?.profile_image_url}
            alt={user?.name}
            style={styles.profileImage}
          />
          <h2 style={styles.name}>{user?.name}</h2>
          <p style={styles.email}>{user?.email}</p>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
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

export default TwitterLogin;
