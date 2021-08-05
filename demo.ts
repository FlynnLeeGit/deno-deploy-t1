addEventListener("fetch", (e: any) => {
  const response = new Response("Hello world Lee", {
    headers: {
      "content-type": "text/plain",
    },
  });
  e.respondWith(response);
});
