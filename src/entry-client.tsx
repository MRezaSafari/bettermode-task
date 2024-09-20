import { ApolloProvider } from "@apollo/client";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { hydrateRoot } from "react-dom/client";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { BackgroundBeams, Header } from "./components";
import "./index.css";
import { Router } from "./router";
import { useServerStore } from "./stores";
import { apolloClient } from "./utilities";

if (import.meta.env.DEV) {
  loadDevMessages();
  loadErrorMessages();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState = (window as any).__INITIAL_STATE__ || {};
useServerStore.setState({
  token: initialState.token,
});

hydrateRoot(
  document.getElementById("app") as HTMLElement,
  <BrowserRouter>
    <HelmetProvider>
      <Helmet>
        <title>BetterHunt</title>
      </Helmet>
      <ApolloProvider client={apolloClient}>
        <Header />
        <Router posts={initialState.posts} post={initialState.post} />
        <BackgroundBeams />
      </ApolloProvider>
    </HelmetProvider>
  </BrowserRouter>
);
