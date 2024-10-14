import domReady from "./utils/domReady.js";

import "./styles/style.css";
import "./styles/components/about.css";
import "./styles/components/team.css";
import "./styles/components/reps.css";
import "./styles/modern-normalize.css";

import { loadHeader } from "./components/Header/Header.js";
import { loadFooter } from "./components/Footer/Footer.js";
import { loadDotsIndicator } from "./components/DotsIndicator/DotsIndicator.js";
import { loadHomeSection } from "./components/HomeSection/HomeSection.js";
import { initProjectSections } from "./components/FeaturedWork/FeaturedWork.js";
import { initializeVideoModal } from "./components/VideoModal/VideoModal.js";
import { initMobileMenu } from "./components/MobileMenu/MobileMenu.js";

import { initializeAllHoverEffects } from "./utils/gifHoverEffect.js";

import "./styles/utils.css";

domReady(() => {
    document.body.style.visibility = "visible";

    loadHeader();

    const pageType = document.body.getAttribute("data-type");

    if (pageType === "home") {
        loadHomeSection("first");

        initProjectSections("data/featuredProjects.json", "home");

        initializeAllHoverEffects();
        loadDotsIndicator("home", 4);
    } else if (pageType === "director") {
        loadHomeSection("last");

        const directorName = document.body.getAttribute("data-director");

        if (directorName) {
            fetch("/electra-website-v5/data/directorProjects.json")
                .then((response) => response.json())
                .then((data) => {
                    const projects = data[directorName];

                    if (projects && projects.length) {
                        initProjectSections(
                            "/electra-website-v5/data/directorProjects.json",
                            directorName
                        );

                        loadDotsIndicator("director", projects.length);
                    } else {
                        console.error("No projects found for this director");
                    }
                })
                .catch((error) =>
                    console.error("Error loading director projects:", error)
                );
        } else {
            console.error("Director name not specified for director page");
        }
    }

    initializeVideoModal();
    loadFooter();
    initMobileMenu();
});
