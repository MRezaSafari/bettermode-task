import cookieParser from "cookie-parser";
import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";

const DEV_ENV = "development";

const bootstrap = async () => {
  const app = express();
  let vite;

  app.use(cookieParser());

  if (process.env.NODE_ENV === DEV_ENV) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });

    // Use Vite's middleware for development
    app.use(vite.middlewares);
  } else {
    // Serve static files in production using Express' static middleware
    app.use(
      express.static(path.resolve("dist/client"), {
        setHeaders: (res, filePath) => {
          if (filePath.endsWith(".gz")) {
            res.setHeader("Content-Encoding", "gzip");
          }
        },
      })
    );
  }

  // Catch all route to handle SSR
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    let template, render;

    try {
      if (process.env.NODE_ENV === DEV_ENV) {
        // Read and transform the index.html using Vite
        template = fs.readFileSync(path.resolve("./index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
      } else {
        // Use pre-built files in production
        template = fs.readFileSync(
          path.resolve("dist/client/index.html"),
          "utf-8"
        );
        render = (await import("./dist/server/entry-server.js")).render;
      }

      // Retrieve the token from the cookie
      const token = req.cookies.token || null; // Use cookie-parser to get the 'token' cookie
      const initialState = { token }; // Define your initial state using the token

      // Render the app's HTML and pass the initial state
      const appHtml = await render({ path: url, initialState });

      // Inject the rendered HTML and initial state into the template
      let html = template.replace(`<!--ssr-outlet-->`, appHtml);

      if (token) {
        html = html.replace(
          `</body>`,
          `<script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
          </body>`
        );
      }

      // Send the HTML response
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
    // Listen on port 3333
    app.listen(3333, () => {
      console.log("Server is running on http://localhost:3333");
    });
  })
  .catch(console.error);
