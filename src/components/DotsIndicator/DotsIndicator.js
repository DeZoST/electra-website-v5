export function loadDotsIndicator(pageType, callback) {
    const indicatorsContainer = document.querySelector(".scroll-indicators");

    if (indicatorsContainer) {
        console.error("Les indicators existent déjà. Aucune action requise.");
        return;
    }

    const dotsContainer = document.createElement("div");
    dotsContainer.className = "scroll-indicators";
    dotsContainer.setAttribute("role", "navigation");
    dotsContainer.setAttribute("aria-label", "Scroll indicators for sections");

    if (pageType === "home") {
        dotsContainer.innerHTML = `
            <div class="indicator" data-target="#home" aria-label="Scroll to Home Section" role="button" tabindex="0"></div>
        `;

        const featuredWorkSections = document.querySelectorAll(
            "[id^='featured-work-0']"
        );
        featuredWorkSections.forEach((section, index) => {
            dotsContainer.innerHTML += `
                <div class="indicator" data-target="#${
                    section.id
                }" aria-label="Scroll to Featured Work Section ${
                index + 1
            }" role="button" tabindex="0"></div>
            `;
        });

        dotsContainer.innerHTML += `
            <div class="indicator" data-target="#about" aria-label="Scroll to About Section" role="button" tabindex="0"></div>
            <div class="indicator" data-target="#staff" aria-label="Scroll to Staff Section" role="button" tabindex="0"></div>
            <div class="indicator" data-target="#reps" aria-label="Scroll to Reps Section" role="button" tabindex="0"></div>
        `;
    } else if (pageType === "director") {
        const featuredWorkSections = document.querySelectorAll(
            "[id^='featured-work-0']"
        );
        featuredWorkSections.forEach((section, index) => {
            dotsContainer.innerHTML += `
                <div class="indicator" data-target="#${
                    section.id
                }" aria-label="Scroll to Featured Work Section ${
                index + 1
            }" role="button" tabindex="0"></div>
            `;
        });

        dotsContainer.innerHTML += `
            <div class="indicator" data-target="#about" aria-label="Scroll to About Section" role="button" tabindex="0"></div>
            <div class="indicator" data-target="#others" aria-label="Scroll to Others Section" role="button" tabindex="0"></div>
        `;
    } else {
        console.error("Invalid page type specified for loadDotsIndicator");
    }

    document.body.appendChild(dotsContainer);

    if (typeof callback === "function") {
        callback();
    }
}

import "./DotsIndicator.css";
