import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";

import { ThemeProvider } from "./Store/Theme/ThemeProvider";
import { DataProvider } from "./Store/Data/DataProvider";
import { AuthProvider } from "./Store/Auth/AuthProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <DataProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </DataProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// reportWebVitals(console.log);
