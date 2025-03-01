import { createRoot } from 'react-dom/client'
import{ StrictMode } from 'react'
import React from 'react';
import "./index.css";
import App from "./App.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
