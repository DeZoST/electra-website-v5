export function initProjectSections(jsonFilePath, sectionPrefix, callback) {
    if (!jsonFilePath || typeof jsonFilePath !== "string") {
        console.error("Invalid JSON file path.");
        return;
    }

    fetch(jsonFilePath)
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    "Network error while loading projects. Status: " +
                        response.status
                );
            }
            return response.json();
        })
        .then((data) => {
            const projects = data[sectionPrefix];
            if (!projects) {
                console.error("No projects found for section:", sectionPrefix);
                return;
            }
            const pageType = document.body.getAttribute("data-type") || "home";
            renderProjectSections(projects, sectionPrefix, pageType);
            if (callback) callback();
        })
        .catch((error) => {
            console.error("Error loading project data:", error.message);
        });
}

function renderProjectSections(projects, sectionPrefix, pageType) {
    const mainElement = document.querySelector("main");
    if (!mainElement) {
        console.error("Main element not found.");
        return;
    }

    let lastInsertedSection = document.querySelector(".home");

    projects.forEach((project) => {
        const section = createProjectSection(project, sectionPrefix, pageType);
        if (lastInsertedSection) {
            lastInsertedSection.insertAdjacentElement("afterend", section);
            lastInsertedSection = section;
        } else {
            mainElement.appendChild(section);
        }
    });
}

function createProjectSection(project, directorName, pageType) {
    const section = document.createElement("section");
    section.id = project.id;
    section.className = "featured__project section container";

    const linkHTML =
        pageType === "home"
            ? `<a class="featured__project__link" href="${project.details.link}">${project.details.linkText}</a>`
            : "";

    const textHTML =
        pageType === "director"
            ? `<h5 class='featured__project__role'>Director</h5><h4 class='featured__project__director-name'>${directorName}</h4>`
            : "<h4 class='featured__project__text'>Featured Projects</h4>";

    section.innerHTML = `
        <div class="featured__project__container">
            ${textHTML}
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
                        <h3 class="featured__project__title">${project.details.company}</h3>
                    </div>
                    ${linkHTML}
                </div>
            </div>
            <lord-icon class="scroll-down-line" src="https://cdn.lordicon.com/ksmzzfxc.json" trigger="loop" stroke="bold" state="loop-slide" colors="primary:#ff4e00,secondary:#ef9622"></lord-icon>
        </div>
    `;
    return section;
}

import "./FeaturedWork.css";
