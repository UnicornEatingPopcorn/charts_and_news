// const routes = {
  // '/charts': '/pages/charts/html',
  // '/news': '/pages/news.html',
// };

// function router() {
  // const path = location.hash.slice(1) || '/'; // Get the current hash or default to "/"
  // const content = routes[path] || '<h1>404</h1><p>Page not found</p>';
  // document.getElementById('app').innerHTML = content;
// }

// window.addEventListener('hashchange', router);
// window.addEventListener('load', router); // Load the initial route
import { navigateTo, router } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  // Intercept navigation clicks
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  // Handle the initial route
  router();
});
