import { scrollToSection } from "./scrollTransition.js";
import { initTouchHandler } from "./touchHandler.js";

let scrollDisabled = false;
/**
 * Controls the disabling of scrolling.
 *
 * @param {boolean} disabled - Whether scrolling should be disabled.
 */
export const setScrollDisabled = (disabled, context = "Unknown") => {
    scrollDisabled = disabled;
    console.log(`Scroll Disabled set to: ${scrollDisabled} by ${context}`);
};

/**
 * Initializes the scroll handler for detecting scroll events and transitioning between sections.
 * This function listens to the `wheel` event to detect when the user scrolls up or down.
 * It prevents the default scrolling behavior and instead transitions between the sections
 * by applying a CSS `transform` to move the container.
 *
 * @param {NodeListOf<Element>} sections - A list of sections to scroll between.
 */
export const initScrollHandler = (sections) => {
    let currentSectionIndex = 0;
    let isScrolling = false;
    const indicators = document.querySelectorAll(".indicator");
    const navLinks = document.querySelectorAll(".nav__link a"); // Select nav links

    const onScroll = (event) => {
        if (isScrolling || scrollDisabled) {
            console.log(
                `Scroll prevented. isScrolling: ${isScrolling}, scrollDisabled: ${scrollDisabled}`
            );
            return;
        }

        const delta = event.deltaY;
        isScrolling = true;

        if (delta > 0 && currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
        } else if (delta < 0 && currentSectionIndex > 0) {
            currentSectionIndex--;
        }

        scrollToSection(currentSectionIndex);
        updateActiveIndicator(indicators[currentSectionIndex]);

        setTimeout(() => {
            isScrolling = false;
        }, 600);
    };

    const throttle = (func, delay) => {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), delay);
            }
        };
    };

    window.addEventListener("wheel", throttle(onScroll, 600));
    initTouchHandler(sections, (index) => {
        currentSectionIndex = index;
        updateActiveIndicator(indicators[currentSectionIndex]);
    });

    function updateActiveIndicator(activeIndicator) {
        indicators.forEach((indicator) => {
            indicator.classList.remove("active");
        });
        if (activeIndicator) {
            activeIndicator.classList.add("active");
        }
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Array.from(sections).indexOf(entry.target);
                    currentSectionIndex = index;
                    entry.target.classList.add("section-visible");
                    console.log(
                        `Section ${entry.target.id} is now visible, index set to: ${currentSectionIndex}`
                    );
                    updateActiveIndicator(
                        document.querySelector(
                            `.indicator[data-target="#${sections[index].id}"]`
                        )
                    );
                } else {
                    entry.target.classList.remove("section-visible");
                }
            });
        },
        {
            threshold: 0.7,
        }
    );

    sections.forEach((section) => observer.observe(section));

    indicators.forEach((indicator) => {
        indicator.addEventListener("click", (event) => {
            event.preventDefault();

            const target = indicator.getAttribute("data-target");
            const targetSection = document.querySelector(target);

            if (targetSection) {
                const targetIndex = Array.from(sections).indexOf(targetSection);
                currentSectionIndex = targetIndex;

                scrollToSection(currentSectionIndex);
                updateActiveIndicator(indicator);

                console.log(
                    `Navigated to section: ${target}, index updated to: ${currentSectionIndex}`
                );
            }
        });
    });

    // **Nav-Link Click Handling**
    navLinks.forEach((navLink) => {
        navLink.addEventListener("click", (event) => {
            event.preventDefault();

            const target = navLink.getAttribute("href");
            const targetSection = document.querySelector(target);

            if (targetSection) {
                const targetIndex = Array.from(sections).indexOf(targetSection);
                currentSectionIndex = targetIndex;

                scrollToSection(currentSectionIndex);
                updateActiveIndicator(indicators[currentSectionIndex]);

                console.log(
                    `Nav link clicked. Navigated to section: ${target}, index updated to: ${currentSectionIndex}`
                );
            }
        });
    });
};
