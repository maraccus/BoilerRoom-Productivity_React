import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "./css/themes.css";

// Notera: Jag ändrade från .jsx till .tsx för att stödja full TypeScript-syntax (Tomac)
// Vet ICKE hur detta kommer att fungera när vi mergar min branch.
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
