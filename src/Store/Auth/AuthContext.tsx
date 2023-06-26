import React from "react";

export interface IAuth {
  isAuthenticated: boolean;
  authToken: string;
  email: string;
  prefersLocalStorage: boolean;
  actions: { [index: string]: Function };
}

export const authDefault: IAuth = {
  isAuthenticated: false,
  authToken: "null",
  email: "null",
  prefersLocalStorage: false,
  actions: {
    authenticate: () => {},
    deauthenticate: () => {},
    setAuthToken: () => {},
    setLocalStoragePreference: () => {},
  },
};

const auth = { ...authDefault };

export const AuthContext = React.createContext({
  auth,
});
