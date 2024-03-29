const CACHE_NAME = "Test_Cache";

let sw_uuid = "";

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

self.addEventListener('install', (event) => {
  sw_uuid = uuidv4();
});

function ResponseMsg(msg) {
  self.clients.matchAll({
    includeUncontrolled: true,
    type: 'window',
  }).then((clients) => {
    if (clients && clients.length) {
      console.log(`Response message in SW: ${msg}`);
      // Send a response - the clients
      // array is ordered by last focused
      clients[0].postMessage({
        type: 'Reply',
        msg: msg,
      });
    } else {
      console.log("No client found in SW");
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

  if (event.data && event.data.type === 'GetUUID') {
    console.log("Fetching the UUID in SW ...");

    ResponseMsg(`SW UUID: ${sw_uuid}`);
  }
});
