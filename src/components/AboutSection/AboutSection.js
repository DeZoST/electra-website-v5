export function loadDirectorSection(directorId, callback) {
    fetch("/electra-website-v5/data/directorsData.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    "Erreur lors du chargement des informations du directeur"
                );
            }
            return response.json();
        })
        .then((data) => {
            const directorData = data.directors[directorId];

            if (!directorData) {
                console.error("Directeur non trouvé :", directorId);
                return;
            }

            const directorSection = document.createElement("section");
            directorSection.className = "director__section";
            directorSection.id = "#about";

            directorSection.innerHTML = `
                <div class="director__content">
                    <h4 class="director__role">DIRECTOR</h4>
                    <h1 class="director__name">${directorData.name}</h1>
                    <p class="director__description">${directorData.description}</p>
                    <a href="/electra-website-v5/index.html#reps" class="director__contact">Contact Us</a>
                </div>
                <div class="director__photo">
                    <img src="${directorData.photo}" alt="${directorData.name}" />
                </div>
            `;

            const mainElement = document.querySelector("main");
            if (mainElement) {
                mainElement.appendChild(directorSection);
            }

            if (callback && typeof callback === "function") {
                callback();
            }
        })
        .catch((error) => {
            console.error(
                "Erreur lors du chargement des données du directeur :",
                error
            );
        });
}

import "./AboutSection.css";
