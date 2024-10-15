export function loadDotsIndicator(pageType, sectionCount) {
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "scroll-indicators";
    dotsContainer.setAttribute("role", "navigation");
    dotsContainer.setAttribute("aria-label", "Scroll indicators for sections");

    if (pageType === "home") {
        dotsContainer.innerHTML = `
            <div class="indicator" data-target="#home" aria-label="Scroll to Home Section" role="button" tabindex="0"></div>
        `;
        for (let i = 1; i <= sectionCount; i++) {
            dotsContainer.innerHTML += `
                <div class="indicator" data-target="#featured-work-0${i}" aria-label="Scroll to Featured Work Section ${i}" role="button" tabindex="0"></div>
            `;
        }
        dotsContainer.innerHTML += `
            <div class="indicator" data-target="#about" aria-label="Scroll to About Section" role="button" tabindex="0"></div>
            <div class="indicator" data-target="#staff" aria-label="Scroll to Staff Section" role="button" tabindex="0"></div>
            <div class="indicator" data-target="#reps" aria-label="Scroll to Reps Section" role="button" tabindex="0"></div>
        `;
    } else if (pageType === "director") {
        for (let i = 1; i <= sectionCount; i++) {
            dotsContainer.innerHTML += `
                <div class="indicator" data-target="#featured-work-0${i}" aria-label="Scroll to Featured Work Section ${i}" role="button" tabindex="0"></div>
            `;
        }
        dotsContainer.innerHTML += `
            <div class="indicator" data-target="#about" aria-label="Scroll to About Section" role="button" tabindex="0"></div>
            <div class="indicator" data-target="#others" aria-label="Scroll to Others Section" role="button" tabindex="0"></div>
        `;
    } else {
        console.error("Invalid page type specified for loadDotsIndicator");
    }

    document.body.appendChild(dotsContainer);
}

import "./DotsIndicator.css";
