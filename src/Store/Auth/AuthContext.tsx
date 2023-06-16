import React from "react";

export interface IAuth {
  isAuthenticated: boolean;
  authToken: string;
  actions: { [index: string]: Function };
}

export const authDefault: IAuth = {
  isAuthenticated: false,
  authToken: "null",
  actions: {
    authenticate: () => {},
    deauthenticate: () => {},
    setAuthToken: () => {},
  },
};

const auth = { ...authDefault };

export const AuthContext = React.createContext({
  auth,
});
