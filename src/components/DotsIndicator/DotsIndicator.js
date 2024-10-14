export function loadDotsIndicator(pageType, sectionCount) {
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "scroll-indicators";

    if (pageType === "home") {
        // Home page indicators
        dotsContainer.innerHTML = `
            <div class="indicator" data-target="#home"></div>
        `;
        for (let i = 1; i <= sectionCount; i++) {
            dotsContainer.innerHTML += `<div class="indicator" data-target="#featured-work-0${i}"></div>`;
        }
        dotsContainer.innerHTML += `
            <div class="indicator" data-target="#about"></div>
            <div class="indicator" data-target="#staff"></div>
            <div class="indicator" data-target="#reps"></div>
        `;
    } else if (pageType === "director") {
        // Director page indicators
        for (let i = 1; i <= sectionCount; i++) {
            dotsContainer.innerHTML += `<div class="indicator" data-target="#featured-work-0${i}"></div>`;
        }
        dotsContainer.innerHTML += `
            <div class="indicator" data-target="#about"></div>
            <div class="indicator" data-target="#others"></div>
        `;
    } else {
        console.error("Invalid page type specified for loadDotsIndicator");
    }

    document.body.appendChild(dotsContainer);
}

import "./DotsIndicator.css";
