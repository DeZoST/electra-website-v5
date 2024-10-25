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
import { initScrollHandler } from "./utils/scrollHandler.js";
import "./styles/utils.css";

const getPageType = () => document.body.getAttribute("data-type");

const handleHomePage = () => {
    loadHomeSection("first");

    initProjectSections("data/featuredProjects.json", "home", () => {
        const allSections = document.querySelectorAll("section");

        loadDotsIndicator("home", () => {
            initScrollHandler(allSections);
            loadFooter();
            initializeVideoModal();
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

    fetch(".//data/directorProjects.json")
        .then((response) => response.json())
        .then((data) => {
            const projects = data[directorName];

            if (!projects || !projects.length) {
                console.error("No projects found for this director");
                return;
            }

            initProjectSections(
                ".//data/directorProjects.json",
                directorName,
                () => {
                    loadDirectorSection(directorName, () => {
                        loadHomeSection("last");

                        const allSections =
                            document.querySelectorAll("section");

                        loadDotsIndicator("director", () => {
                            initScrollHandler(allSections);
                            loadFooter();
                            initializeVideoModal();
                        });
                    });
                }
            );
        })
        .catch((error) =>
            console.error("Error loading director projects:", error)
        );
};

const initializePage = () => {
    loadHeader();

    const pageType = getPageType();

    if (pageType === "home") {
        handleHomePage();
    } else if (pageType === "director") {
        handleDirectorPage();
    }

    initMobileMenu();
};

domReady(() => {
    document.body.style.visibility = "visible";
    initializePage();
});
