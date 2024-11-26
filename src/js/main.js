import { navigateTo, router } from "./router.js";
import fetchAndDisplayItems from "./items.js";

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
  fetchAndDisplayItems();
});
