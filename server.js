import cookieParser from "cookie-parser";
import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
import fetchPost from "./src/server/get-post.query.js";
import fetchPosts from "./src/server/get-posts.query.js";

const DEV_ENV = "development";
const port = process.env.PORT || 3333;
const base = process.env.BASE || "/";
const bootstrap = async () => {
  const app = express();
  let vite;

  app.use(cookieParser());

  if (process.env.NODE_ENV === DEV_ENV) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
      base,
    });
    app.use(vite.middlewares);
  } else {
    const compression = (await import("compression")).default;
    const sirv = (await import("sirv")).default;
    app.use(compression());
    app.use(base, sirv("./dist/client", { extensions: [] }));
  }

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    let template, render;

    try {
      const token = req.cookies.token || null;

      if (url.startsWith("/auth/signup") || url.startsWith("/auth/verify")) {
        // Allow access to signup page without checking token
      } else if (!token) {
        return res.redirect("/auth/signup");
      }

      if (process.env.NODE_ENV === DEV_ENV) {
        template = fs.readFileSync(path.resolve("./index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
      } else {
        template = fs.readFileSync(
          path.resolve("dist/client/index.html"),
          "utf-8"
        );
        render = (await import("./dist/server/entry-server.js")).render;
      }

      let postsData = [];
      if (url === "/") {
        const { data: fetchedPostsData } = await fetchPosts(token);
        postsData = fetchedPostsData;
      }

      let postData = {};

      if (url.startsWith("/products/post")) {
        const slug = url.replace("/products/post/");

        const splitted = slug.split("-");

        const postId = splitted[splitted.length - 1];
        const { data } = await fetchPost(token, postId);

        postData = data;
      }

      // Render the app’s HTML with SSR
      const { appHtml, helmet } = await render({
        path: url,
        posts: postsData,
        post: postData.post,
      });

      // Inject the HTML
      let html = template.replace(`<!--ssr-outlet-->`, appHtml);
      const initialState = { token, posts: postsData, post: postData.post };

      html = html.replace(
        `<head>`,
        `<head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
        `
      );

      html = html.replace(
        `</body>`,
        `<script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        </body>`
      );

      res.status(200).set("Content-Type", "text/html").end(html);
    } catch (error) {
      if (vite && vite.ssrFixStacktrace) {
        vite.ssrFixStacktrace(error);
      }
      next(error);
    }
  });

  return { app };
};

bootstrap()
  .then(async ({ app }) => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(console.error);
