import { ApolloProvider } from "@apollo/client";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import "./index.css";
import { Router } from "./router";
import { apolloClient } from "./utilities";

interface IRenderProps {
  path: string;
}

export const render = ({ path }: IRenderProps) => {
  return renderToString(
    <StaticRouter location={path}>
      <ApolloProvider client={apolloClient}>
        <Router />
      </ApolloProvider>
    </StaticRouter>
  );
};
