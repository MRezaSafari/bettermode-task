import { ApolloProvider } from "@apollo/client";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { BackgroundBeams, Header } from "./components";
import "./index.css";
import { Router } from "./router";
import { apolloClient } from "./utilities";

import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { HelmetProvider } from "react-helmet-async";
import { IPostNode, IPostsData } from "./models";


if (import.meta.env.DEV) {
  loadDevMessages();
  loadErrorMessages();
}

interface IRenderProps {
  path: string;
  posts: IPostsData;
  post?: IPostNode;
}

export const render = ({ path, posts, post }: IRenderProps) => {
  const helmetContext = {};

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={path}>
        <ApolloProvider client={apolloClient}>
          <Header />
          <Router posts={posts} post={post} />
          <BackgroundBeams />
        </ApolloProvider>
      </StaticRouter>
    </HelmetProvider>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { helmet } = helmetContext as any;

  return {
    appHtml,
    helmet,
  };
};
