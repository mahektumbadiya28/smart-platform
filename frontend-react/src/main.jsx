import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import "./styles/global.css";
import React from "react";

import ReactDOM from "react-dom/client";

import ThemeProvider from "./context/ThemeContext";

import {
  ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <ThemeProvider>

      <App />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </ThemeProvider>

  </React.StrictMode>
);

