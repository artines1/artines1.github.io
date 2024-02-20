self.addEventListener("install", function (event) {
  self.skipWaiting(); // Activate worker immediately
});

self.addEventListener("activate", function (event) {
  event.waitUntil(clients.claim()); // Become available to all pages
});

self.addEventListener("message", function (event) {
  if (event.data.action === "fetchFile") {
    fetch(event.data.url)
      .then((response) => response.text())
      .then((data) => {
        // Assuming the client that requested the file is still focused
        clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({ fileContent: data });
          });
        });
      })
      .catch(console.error);
  }
});
