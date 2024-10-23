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

domReady(() => {
    document.body.style.visibility = "visible";
    loadHeader();

    const pageType = document.body.getAttribute("data-type");

    // Gestion de l'ancre (ex: #reps, #about) après redirection
    const hash = window.location.hash; // Récupérer l'ancre
    let targetIndex = null;

    if (pageType === "home") {
        // Charger la section home d'abord
        loadHomeSection("first");

        initProjectSections("data/featuredProjects.json", "home", () => {
            const allSections = document.querySelectorAll("section");

            // Si une ancre est présente, la trouver et définir l'index cible
            if (hash) {
                const targetSection = document.querySelector(hash);
                if (targetSection) {
                    targetIndex =
                        Array.from(allSections).indexOf(targetSection);
                }
            }

            // Charger les dots indicators et initier le scroll handler
            loadDotsIndicator("home", () => {
                initScrollHandler(allSections);

                // Si l'ancre existe, faire défiler jusqu'à la section correspondante
                if (targetIndex !== null) {
                    scrollToSection(targetIndex);
                }

                loadFooter(); // Charger le footer après
            });
        });

        initializeAllHoverEffects();
    } else if (pageType === "director") {
        const directorName = document.body.getAttribute("data-director");

        if (directorName) {
            fetch("/electra-website-v5/data/directorProjects.json")
                .then((response) => response.json())
                .then((data) => {
                    const projects = data[directorName];

                    if (projects && projects.length) {
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
    initMobileMenu();
});
