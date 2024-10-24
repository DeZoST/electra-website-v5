import domReady from "./utils/domReady.js";
import "./styles/style.css";
import "./styles/components/about.css";
import "./styles/components/team.css";
import "./styles/components/reps.css";
import "./styles/modern-normalize.css";

import { loadHeader } from "./components/Header/Header.js";
import { loadFooter } from "./components/Footer/Footer.js";
import { loadDirectorSection } from "./components/AboutSection/AboutSection.js";
import { loadDotsIndicator } from "./components/DotsIndicator/DotsIndicator.js";
import { loadHomeSection } from "./components/HomeSection/HomeSection.js";
import { initProjectSections } from "./components/FeaturedWork/FeaturedWork.js";
import { initializeVideoModal } from "./components/VideoModal/VideoModal.js";
import { initMobileMenu } from "./components/MobileMenu/MobileMenu.js";
import { initializeAllHoverEffects } from "./utils/gifHoverEffect.js";
import { scrollToSection } from "./utils/scrollTransition.js";
import { initScrollHandler } from "./utils/scrollHandler.js";
import "./styles/utils.css";

// Modular functions
const getPageType = () => document.body.getAttribute("data-type");

const handleHomePage = () => {
    loadHomeSection("first");

    // Fetch project data and initialize project sections
    initProjectSections("data/featuredProjects.json", "home", () => {
        const allSections = document.querySelectorAll("section");
        handleHashScroll(allSections);

        // Load dots indicator and scroll handler
        loadDotsIndicator("home", () => {
            initScrollHandler(allSections);
            loadFooter(); // Load footer after everything is ready
        });
    });

    initializeAllHoverEffects();
};

const handleDirectorPage = () => {
    const directorName = document.body.getAttribute("data-director");

    if (!directorName) {
        console.error("Director name not specified for director page");
        return;
    }

    // Fetch and initialize director's project sections
    fetch("/electra-website-v5/data/directorProjects.json")
        .then((response) => response.json())
        .then((data) => {
            const projects = data[directorName];

            if (!projects || !projects.length) {
                console.error("No projects found for this director");
                return;
            }

            initProjectSections(
                "/electra-website-v5/data/directorProjects.json",
                directorName,
                () => {
                    loadDirectorSection(directorName, () => {
                        loadHomeSection("last");

                        const allSections =
                            document.querySelectorAll("section");

                        loadDotsIndicator("director", () => {
                            initScrollHandler(allSections);
                            loadFooter();
                        });
                    });
                }
            );
        })
        .catch((error) =>
            console.error("Error loading director projects:", error)
        );
};

// Handle anchor-based scrolling if there is a hash in the URL
const handleHashScroll = (sections) => {
    const hash = window.location.hash;
    let targetIndex = null;

    if (hash) {
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            targetIndex = Array.from(sections).indexOf(targetSection);
        }
    }

    if (targetIndex !== null) {
        scrollToSection(targetIndex);
    }
};

const initializePage = () => {
    loadHeader();

    const pageType = getPageType();

    if (pageType === "home") {
        handleHomePage();
    } else if (pageType === "director") {
        handleDirectorPage();
    }

    initializeVideoModal();
    initMobileMenu();
};

// Initialize once DOM is ready
domReady(() => {
    document.body.style.visibility = "visible";
    initializePage();
});
