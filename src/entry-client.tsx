import { ApolloProvider } from "@apollo/client";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { BackgroundBeams, Header } from "./components";
import "./index.css";
import { Router } from "./router";
import { apolloClient } from "./utilities";

if (import.meta.env.DEV) {
  loadDevMessages();
  loadErrorMessages();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState = (window as any).__INITIAL_STATE__ || {};
// useServerStore.setState(initialState);

hydrateRoot(
  document.getElementById("app") as HTMLElement,
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <Header />
      <Router posts={initialState.posts} />
      <BackgroundBeams />
    </ApolloProvider>
  </BrowserRouter>
);
