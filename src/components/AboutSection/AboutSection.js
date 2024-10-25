export function loadDirectorSection(directorId, callback) {
    if (!directorId) {
        console.error("Invalid director ID provided.");
        return;
    }

    fetch("./data/directorsData.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    "Error loading director information. Status: " +
                        response.status
                );
            }
            return response.json();
        })
        .then((data) => {
            const directorData = data.directors[directorId];

            if (!directorData) {
                console.error("Director not found:", directorId);
                return;
            }

            const directorSection = createDirectorSection(directorData);
            const mainElement = document.querySelector("main");

            if (mainElement) {
                mainElement.appendChild(directorSection);
            } else {
                console.error("Main element not found.");
            }

            if (callback && typeof callback === "function") {
                callback();
            }
        })
        .catch((error) => {
            console.error("Error loading director data:", error.message);
        });
}

function createDirectorSection(directorData) {
    const section = document.createElement("section");
    section.className = "director__section";
    section.id = "about";

    section.innerHTML = `
        <div class="director__content">
            <h4 class="director__role">DIRECTOR</h4>
            <h1 class="director__name">${directorData.name}</h1>
            <p class="director__description">${directorData.description}</p>
            <a href="./index.html#reps" class="director__contact">Contact Us</a>
        </div>
        <div class="director__photo">
            <img src="${directorData.photo}" alt="${directorData.name}" />
        </div>
    `;
    return section;
}

import "./AboutSection.css";
