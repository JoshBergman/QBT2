import { useState } from "react";

import { AuthContext, authDefault, IAuth } from "./AuthContext";
import pseudo from "./PsuedoEncrypt";

interface IProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: IProviderProps) => {
  const storedToken = localStorage.getItem("s");
  const storedEmail = localStorage.getItem("m");
  const storedPref = localStorage.getItem("l");
  const defaultToken: string =
    storedToken == null
      ? authDefault.authToken
      : pseudo.decrypt(storedToken, 10);
  const defaultEmail =
    storedEmail == null ? authDefault.email : pseudo.decrypt(storedEmail, 10);
  const defaultPref = storedPref === "y" ? true : false;

  const [currToken, setCurrToken] = useState<IAuth["authToken"]>(defaultToken);
  const [currAuthStatus, setCurrAuth] = useState<IAuth["isAuthenticated"]>(
    defaultToken === "null" || defaultEmail === "null" ? false : true
  );
  const [currEmail, setCurrEmail] = useState<IAuth["email"]>(defaultEmail);
  const [prefLocalStorage, setPrefLocalStorage] = useState(defaultPref);

  const authenticate = (sessionID: string, email: string) => {
    setCurrAuth(true);
    setCurrToken(sessionID);
    localStorage.setItem("s", pseudo.encrypt(sessionID, 10));
    localStorage.setItem("m", pseudo.encrypt(email, 10));
  };

  const deauthenticate = () => {
    setCurrAuth(false);
    setCurrToken("null");
    setCurrEmail("null");
    localStorage.removeItem("s");
    localStorage.removeItem("m");
  };

  const setAuthToken = (newToken: string) => {
    setCurrToken(newToken);
  };

  const setLocalStoragePreference = (newPreference: boolean) => {
    setPrefLocalStorage(newPreference);
  };

  const finalAuthData: IAuth = {
    isAuthenticated: currAuthStatus,
    authToken: currToken,
    email: currEmail,
    prefersLocalStorage: prefLocalStorage,
    actions: {
      authenticate,
      deauthenticate,
      setAuthToken,
      setLocalStoragePreference,
    },
  };

  return (
    <AuthContext.Provider value={{ auth: finalAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};
