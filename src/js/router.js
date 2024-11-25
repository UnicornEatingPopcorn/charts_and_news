import renderChartsPage from "./charts.js";
import renderNewsPage from "./news.js";

export function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

export function router() {
  const routes = {
    "/": () => `<h1>Welcome to the Home Page</h1>`,
    "/charts": renderChartsPage,
    "/news": renderNewsPage,
  };

  const path = location.hash.slice(1) || '/';
  const content = routes[path] || (() => `<h1>404 - Page Not Found</h1>`);
  document.querySelector("#app").innerHTML = content();

  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
}
