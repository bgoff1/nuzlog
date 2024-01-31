import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";

declare let self: ServiceWorkerGlobalScope;

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

// to allow work offline
registerRoute(new NavigationRoute(createHandlerBoundToURL("index.html")));

function putInCache(request: RequestInfo[]): Promise<void>;
function putInCache(request: Request, response: Response): Promise<void>;
async function putInCache(
  request: Request | RequestInfo[],
  response?: Response,
): Promise<void> {
  const cache = await caches.open("v1");
  if (response) {
    return cache.put(request as Request, response);
  }
  return cache.addAll(request as RequestInfo[]);
}

const isExtension = (url: string) =>
  url.startsWith("chrome-extension") || url.indexOf("http") !== 0;

const respondWithNetwork = async (request: Request): Promise<Response> => {
  try {
    const responseFromNetwork = await fetch(request.clone());
    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    if (!isExtension(request.url)) {
      putInCache(request, responseFromNetwork.clone());
    }
    return responseFromNetwork;
  } catch (error) {
    // when even the fallback response is not available,
    // there is nothing we can do, but we must always
    // return a Response object
    return new Response("Network error happened", {
      status: 408,
      headers: { "Content-Type": "text/plain" },
    });
  }
};

const cacheFirst = async (request: Request): Promise<Response> => {
  if (isExtension(request.url)) {
    return respondWithNetwork(request);
  }

  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  // Next try to get the resource from the network
  return respondWithNetwork(request);
};

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});

self.addEventListener("install", (event) => {
  event.waitUntil(putInCache(["/pokemon.db"]));
});
