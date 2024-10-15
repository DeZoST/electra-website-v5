import { initScrollHandler } from "../../utils/scrollHandler.js";

export function initProjectSections(jsonFilePath, sectionPrefix) {
    fetch(jsonFilePath)
        .then((response) => response.json())
        .then((data) => {
            const pageType = document.body.getAttribute("data-type");
            const aboutSection = document.querySelector("#about");

            const projects = data[sectionPrefix];

            if (!projects) {
                console.error(
                    "No projects found for this section:",
                    sectionPrefix
                );
                return;
            }

            projects.forEach((project) => {
                const section = document.createElement("section");
                section.id = `${project.id}`;
                section.className = "featured__project section container";

                const linkHTML =
                    pageType === "home"
                        ? `<a class="featured__project__link" href="${project.details.link}">${project.details.linkText}</a>`
                        : "";

                const titleHTML = project.details.title
                    ? `<h3 class="featured__project__title">${project.details.title}</h3>`
                    : "";

                section.innerHTML = `
                    <div class="featured__project__container">
                        <h4 class="featured__project__text">Featured Projects</h4>
                        <div class="featured__project__wrapper">
                            <div class="featured__project__video" data-playback-id="${project.video.playbackId}">
                                <img class="featured__project__thumbnail" src="${project.video.thumbnail}" alt="${project.video.alt}" loading="lazy" />
                                
                            </div>
                            <div class="featured__project__details__container">
                                <img src="${project.details.icon}" alt="${project.details.iconAlt}" loading="eager" class="featured__project__svg" />
                                <div class="featured__project__details">
                                    <h2 class="featured__project__name">${project.details.name}</h2>
                                    <h4 class="featured__project__type">${project.details.type}</h4>
                                </div>
                                <div class="featured__project__details">
                                    <h3 class="featured__project__company">${project.details.company}</h3>
                                    ${titleHTML}
                                </div>
                                ${linkHTML}
                            </div>
                        </div>
                    </div>
                `;

                aboutSection.insertAdjacentElement("beforebegin", section);
            });

            const sections = document.querySelectorAll("section");
            initScrollHandler(sections);
        })
        .catch((error) => console.error("Error loading projects:", error));
}

import "./FeaturedWork.css";
