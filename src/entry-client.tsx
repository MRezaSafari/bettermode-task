import { ApolloProvider } from "@apollo/client";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { BackgroundBeams, Header } from "./components";
import "./index.css";
import { Router } from "./router";
import { useServerStore } from "./stores";
import { apolloClient } from "./utilities";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState = (window as any).__INITIAL_STATE__ || {};
useServerStore.setState(initialState);

hydrateRoot(
  document.getElementById("app") as HTMLElement,
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <Header />
      <Router />
      <BackgroundBeams />
    </ApolloProvider>
  </BrowserRouter>
);
