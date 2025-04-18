import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ExpesesProvider from "./context/ExpesesProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ExpesesProvider>
      <App />
    </ExpesesProvider>
  </StrictMode>
);
