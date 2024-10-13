// src/components/DotsIndicator/DotsIndicator.js

export function loadDotsIndicator(pageType) {
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "scroll-indicators";

    if (pageType === "home") {
        // Home page indicators
        dotsContainer.innerHTML = `
            <div class="indicator" data-target="#home"></div>
            <div class="indicator" data-target="#featured-work-01"></div>
            <div class="indicator" data-target="#featured-work-02"></div>
            <div class="indicator" data-target="#featured-work-03"></div>
            <div class="indicator" data-target="#featured-work-04"></div>
            <div class="indicator" data-target="#about"></div>
            <div class="indicator" data-target="#staff"></div>
            <div class="indicator" data-target="#reps"></div>
        `;
    } else if (pageType === "director") {
        // Director page indicators
        dotsContainer.innerHTML = `
            <div class="indicator" data-target="#featured-work-01"></div>
            <div class="indicator" data-target="#featured-work-02"></div>
            <div class="indicator" data-target="#featured-work-03"></div>
            <div class="indicator" data-target="#featured-work-04"></div>
            <div class="indicator" data-target="#about"></div>
            <div class="indicator" data-target="#others"></div>
        `;
    } else {
        console.error("Invalid page type specified for loadDotsIndicator");
    }

    document.body.appendChild(dotsContainer);
}

import "./DotsIndicator.css";
