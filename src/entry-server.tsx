import { ApolloProvider } from "@apollo/client";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { BackgroundBeams, Header } from "./components";
import "./index.css";
import { Router } from "./router";
import { apolloClient } from "./utilities";

import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";

if (import.meta.env.DEV) {
  loadDevMessages();
  loadErrorMessages();
}

interface IRenderProps {
  path: string;
}

export const render = ({ path }: IRenderProps) => {
  const html = renderToString(
    <StaticRouter location={path}>
      <ApolloProvider client={apolloClient}>
        <Header />
        <Router />
        <BackgroundBeams />
      </ApolloProvider>
    </StaticRouter>
  );
  return html;
};
