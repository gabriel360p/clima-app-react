import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages";
import { GlobalStyle } from "./styles/GlobalStyle";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStyle />

    {/* Page Principal */}
    <Home />

  </StrictMode>,
);
