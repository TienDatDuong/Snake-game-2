import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SnakeContextProvider from "./Contexts/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SnakeContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SnakeContextProvider>
);
