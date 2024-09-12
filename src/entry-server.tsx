import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import "./index.css";
import { Router } from "./router";

interface IRenderProps {
  path: string;
}

export const render = ({ path }: IRenderProps) => {
  return renderToString(
    <StaticRouter location={path}>
      <Router />
    </StaticRouter>
  );
};
