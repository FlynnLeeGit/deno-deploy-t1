import { h } from "https://x.lcas.dev/preact@10.5.12/mod.js";
import { renderToString } from "https://x.lcas.dev/preact@10.5.12/ssr.js";

function App() {
  return (
    <html>
      <head>
        <title>Hello World 12</title>
        <link rel="icon" href="/favicon.png" type="image/x-icon"></link>
        <link rel="stylesheet" href="/style.css"></link>
      </head>
      <body>
        <h1>Simple Page</h1>
      </body>
    </html>
  );
}

/**
 *
 * @param {Request} req
 */
const handleRequest = async (req) => {
  req.headers.forEach((v, k) => {
    console.log({ v, k });
  });
  const { pathname } = new URL(req.url);

  // static files
  if (pathname !== "/") {
    const style = new URL(`public${pathname}`, import.meta.url);
    const resPromise = fetch(style).then((_res) => {
      console.log("res", _res);
      return _res;
    });
    return resPromise;
  }

  return new Response(renderToString(<App />), {
    headers: {
      "content-type": "text/html;charset=utf-8",
    },
  });
};

addEventListener("fetch", (e) => {
  const res = handleRequest(e.request);
  e.respondWith(res);
});
