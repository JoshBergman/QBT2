import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";

import { ThemeProvider } from "./Store/Theme/ThemeProvider";
import { DataProvider } from "./Store/Data/DataProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// reportWebVitals(console.log);
