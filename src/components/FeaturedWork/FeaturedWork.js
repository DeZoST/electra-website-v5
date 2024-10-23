export function initProjectSections(jsonFilePath, sectionPrefix, callback) {
    fetch(jsonFilePath)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur réseau lors du chargement des projets");
            }
            return response.json();
        })
        .then((data) => {
            const pageType = document.body.getAttribute("data-type");
            const homeSection = document.querySelector(".home");
            const mainElement = document.querySelector("main");
            const projects = data[sectionPrefix];

            if (!projects) {
                console.error(
                    "Aucun projet trouvé pour cette section:",
                    sectionPrefix
                );
                return;
            }

            const directorName = sectionPrefix;

            let lastInsertedSection = homeSection;

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

                const textHTML =
                    pageType === "director"
                        ? `
                        <h5 class='featured__project__role'>Director</h5>
                        <h4 class='featured__project__director-name'>${directorName}</h4>
                    `
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
                                    ${titleHTML}
                                </div>
                                ${linkHTML}
                            </div>
                        </div>
                        <lord-icon class="scroll-down-line" src="https://cdn.lordicon.com/ksmzzfxc.json" trigger="loop" stroke="bold" state="loop-slide" colors="primary:#ff4e00,secondary:#ef9622"></lord-icon>
                    </div>
                `;

                if (pageType === "home" && homeSection && mainElement) {
                    lastInsertedSection.insertAdjacentElement(
                        "afterend",
                        section
                    );
                    lastInsertedSection = section;
                } else if (mainElement) {
                    mainElement.appendChild(section);
                }
            });

            if (callback) {
                callback();
            }
        })
        .catch((error) =>
            console.error("Erreur lors du chargement des projets :", error)
        );
}

import "./FeaturedWork.css";
