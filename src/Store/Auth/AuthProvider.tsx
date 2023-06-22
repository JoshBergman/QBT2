import { useState } from "react";

import { AuthContext, authDefault, IAuth } from "./AuthContext";
import pseudo from "./PsuedoEncrypt";

interface IProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: IProviderProps) => {
  const storedToken = localStorage.getItem("s");
  const defaultToken: string =
    storedToken == null ? authDefault.authToken : storedToken;
  const [currToken, setCurrToken] = useState<IAuth["authToken"]>(defaultToken);
  const [currAuthStatus, setCurrAuth] = useState<IAuth["isAuthenticated"]>(
    defaultToken === "null" ? false : true
  );

  const authenticate = (sessionID: string, email: string) => {
    setCurrAuth(true);
    setCurrToken(sessionID);
    localStorage.setItem("s", pseudo.encrypt(sessionID, 10));
    localStorage.setItem("m", pseudo.encrypt(email, 10));
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
