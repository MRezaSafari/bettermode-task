import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Router } from "./router";

hydrateRoot(
  document.getElementById("app") as HTMLElement,
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);
