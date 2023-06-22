import { useState } from "react";

import { AuthContext, authDefault, IAuth } from "./AuthContext";

interface IProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: IProviderProps) => {
  const [currAuthStatus, setCurrAuth] = useState<IAuth["isAuthenticated"]>(
    authDefault.isAuthenticated
  );
  const [currToken, setCurrToken] = useState<IAuth["authToken"]>(
    authDefault.authToken
  );

  const authenticate = (sessionID: string) => {
    setCurrAuth(true);
    setCurrToken(sessionID);
    localStorage.setItem("s", sessionID);
  };

  const deauthenticate = () => {
    setCurrAuth(false);
    setCurrToken("");
    localStorage.removeItem("s");
  };

  const setAuthToken = (newToken: string) => {
    setCurrToken(newToken);
  };

  const finalAuthData: IAuth = {
    isAuthenticated: currAuthStatus,
    authToken: currToken,
    actions: {
      authenticate: authenticate,
      deauthenticate: deauthenticate,
      setAuthToken: setAuthToken,
    },
  };

  return (
    <AuthContext.Provider value={{ auth: finalAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};
