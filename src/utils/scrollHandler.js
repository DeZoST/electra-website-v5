import { scrollToSection } from "./scrollTransition.js";
import { initTouchHandler } from "./touchHandler.js";

let scrollDisabled = false;

export const setScrollDisabled = (disabled) => {
    scrollDisabled = disabled;
};

export const initScrollHandler = (sections) => {
    let currentSectionIndex = 0;
    let isScrolling = false;
    const indicators = document.querySelectorAll(".indicator");
    const navLinks = document.querySelectorAll(".nav__link a");
    const scrollFeedback = document.getElementById("scrollFeedback");

    function updateScrollFeedback(sectionName) {
        scrollFeedback.textContent = `Scrolled to ${sectionName} section`;
    }

    function updateActiveIndicator(activeIndicator) {
        indicators.forEach((indicator) => {
            indicator.classList.remove("active");
            indicator.setAttribute("aria-current", "false");
        });
        if (activeIndicator) {
            activeIndicator.classList.add("active");
            activeIndicator.setAttribute("aria-current", "true");

            const target = activeIndicator.getAttribute("data-target");
            const targetSection = document.querySelector(target);
            if (targetSection) {
                const sectionName =
                    targetSection.getAttribute("aria-label") ||
                    targetSection.id;
                updateScrollFeedback(sectionName);
            }
        }
    }

    const onScroll = (event) => {
        if (isScrolling || scrollDisabled) {
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

        window.requestAnimationFrame(() => {
            setTimeout(() => {
                isScrolling = false;
            }, 600);
        });
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

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Array.from(sections).indexOf(entry.target);
                    currentSectionIndex = index;
                    entry.target.classList.add("section-visible");
                    updateActiveIndicator(indicators[index]);
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
        indicator.setAttribute("role", "button");
        indicator.setAttribute("tabindex", "0");

        indicator.addEventListener("click", (event) => {
            event.preventDefault();
            handleIndicatorNavigation(indicator);
        });

        indicator.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleIndicatorNavigation(indicator);
            }
        });
    });

    function handleIndicatorNavigation(indicator) {
        const target = indicator.getAttribute("data-target");
        const targetSection = document.querySelector(target);

        if (targetSection) {
            const targetIndex = Array.from(sections).indexOf(targetSection);
            currentSectionIndex = targetIndex;

            scrollToSection(currentSectionIndex);
            updateActiveIndicator(indicator);
        }
    }

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
            }
        });
    });
};
