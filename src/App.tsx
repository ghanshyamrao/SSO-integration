// src/App.tsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { LogLevel, PublicClientApplication } from "@azure/msal-browser";
import Login from "./components/Login";
import UserDetails from "./components/UserDetails";
import { User } from "./Types";
import "./App.css"

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const msalConfig = {
    auth: {
      clientId: process.env.REACT_APP_AZURE_CLIENT_ID || "",
      authority: `https://login.microsoftonline.com/common`,
      redirectUri: window.location.origin,
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
      loggerOptions: {
        loggerCallback: (level:any, message:any, containsPii:any) => {
          if (containsPii) {
            return;
          }
          switch (level) {
            case LogLevel.Error:
              console.error(message);
              return;
            case LogLevel.Info:
              console.info(message);
              return;
            case LogLevel.Verbose:
              console.debug(message);
              return;
            case LogLevel.Warning:
              console.warn(message);
              return;
            default:
              return;
          }
        },
      },
    },
  };

  return (
    <MsalProvider instance={new PublicClientApplication(msalConfig)}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/user-details" replace />
              ) : (
                <Login setUser={setUser} />
              )
            }
          />
          <Route path="/user-details" element={<UserDetails user={user} />} />
        </Routes>
      </Router>
    </MsalProvider>
  );
};

export default App;
