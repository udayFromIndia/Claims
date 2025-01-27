import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <App />
      <ToastContainer />
    </LocalizationProvider>
  </StrictMode>
);
