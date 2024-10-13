import domReady from "./utils/domReady.js";

import { loadHeader } from "./components/Header/Header.js";
import { loadFooter } from "./components/Footer/Footer.js";
import { loadDotsIndicator } from "./components/DotsIndicator/DotsIndicator.js";
import { loadHomeSection } from "./components/HomeSection/HomeSection.js";
import { initProjectSections } from "./components/FeaturedWork/FeaturedWork.js";
import { initializeVideoModal } from "./components/VideoModal/VideoModal.js";

import { initializeAllHoverEffects } from "./utils/gifHoverEffect.js";
import { initMobileMenu } from "./utils/mobileMenu.js";

import "./styles/style.css";

domReady(() => {
    document.body.style.visibility = "visible";

    // Load shared components
    loadHeader();

    // Determine page type and load page-specific content
    const pageType = document.body.getAttribute("data-type");

    if (pageType === "home") {
        loadHomeSection("first");
        initProjectSections("data/featuredProjects.json", "home"); // Pass "home" as sectionPrefix
        initializeAllHoverEffects();
        loadDotsIndicator("home");
    } else if (pageType === "director") {
        loadHomeSection("last");

        // Get the director name from the data-director attribute
        const directorName = document.body.getAttribute("data-director");

        if (directorName) {
            initProjectSections(
                "../../data/directorProjects.json",
                directorName
            ); // Pass director name as sectionPrefix
        } else {
            console.error("Director name not specified for director page");
        }

        loadDotsIndicator("director");
    }

    initializeVideoModal();
    loadFooter();

    // Additional utilities
    initMobileMenu();
});
