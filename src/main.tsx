import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App";
import List from "./list";
import Local from "./local";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/lista" element={<List />} />
        <Route path="/local" element={<Local />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
