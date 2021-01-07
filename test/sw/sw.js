const CACHE_NAME = "Test_Cache";

function ResponseMsg(msg) {
  self.clients.matchAll({
    includeUncontrolled: true,
    type: 'window',
  }).then((clients) => {
    if (clients && clients.length) {
      // Send a response - the clients
      // array is ordered by last focused
      clients[0].postMessage({
        type: 'Reply',
        msg: msg,
      });
    }
  });
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'Set') {
    console.log("Setting Cache in SW ...");

    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
        'assert.txt'
      ]);
    }).then(() => {
      ResponseMsg("Set the cache successfully");
    }).catch( err => {
      ResponseMsg("Fail to se the cache");
    });
  }

  if (event.data && event.data.type === 'Check') {
    console.log("Checking Cache in SW ...");

    caches.has(CACHE_NAME).then(function(boolean) {
      if (boolean) {
        ResponseMsg("The cache exists");
      } else {
        ResponseMsg("The cache doesn't exist");
      }
    });
  }

  if (event.data && event.data.type === 'Clear') {
    console.log("Clearing Cache in SW ...");

    caches.delete(CACHE_NAME).then(function(boolean) {
      if (boolean) {
        ResponseMsg("The cache has been deleted");
      } else {
        ResponseMsg("The cache doesn't exist, so cannot be deleted");
      }
    });
  }
});
