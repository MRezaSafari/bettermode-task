import { ApolloProvider } from "@apollo/client";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Router } from "./router";
import { apolloClient } from "./utilities";

hydrateRoot(
  document.getElementById("app") as HTMLElement,
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <Router />
    </ApolloProvider>
  </BrowserRouter>
);
