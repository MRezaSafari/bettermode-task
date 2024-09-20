import { ApolloProvider } from "@apollo/client";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { BackgroundBeams, Header } from "./components";
import "./index.css";
import { Router } from "./router";
import { apolloClient } from "./utilities";

import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { IPostsData } from "./models";

if (import.meta.env.DEV) {
  loadDevMessages();
  loadErrorMessages();
}

interface IRenderProps {
  path: string;
  posts: IPostsData;
}

export const render = ({ path, posts }: IRenderProps) => {
  const html = renderToString(
    <StaticRouter location={path}>
      <ApolloProvider client={apolloClient}>
        <Header />
        <Router posts={posts} />
        <BackgroundBeams />
      </ApolloProvider>
    </StaticRouter>
  );
  return html;
};
