import { initializeAllHoverEffects } from "./utils/gifHoverEffect.js";
import { initMobileMenu } from "./utils/mobile-menu.js";
import { initScrollHandler } from "./utils/scrollHandler.js";

const sections = document.querySelectorAll("section");

let domReady = (cb) => {
    document.readyState === "interactive" || document.readyState === "complete"
        ? cb()
        : document.addEventListener("DOMContentLoaded", cb);
};

domReady(() => {
    document.body.style.visibility = "visible";
});

initScrollHandler(sections);
initMobileMenu();
initializeAllHoverEffects();
