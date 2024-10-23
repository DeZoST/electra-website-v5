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
        if (scrollFeedback) {
            scrollFeedback.textContent = `Scrolled to ${sectionName} section`;
        }
    }

    function updateActiveIndicator() {
        const activeIndicator = indicators[currentSectionIndex];

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

    function handleIndicatorNavigation(indicator) {
        const target = indicator.getAttribute("data-target");
        const targetSection = document.querySelector(target);

        if (targetSection) {
            const targetIndex = Array.from(sections).indexOf(targetSection);
            if (targetIndex !== -1) {
                currentSectionIndex = targetIndex;

                scrollToSection(currentSectionIndex);

                updateActiveIndicator();
                indicator.focus();
            }
        }
    }

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
        updateActiveIndicator();

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
        updateActiveIndicator();
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Array.from(sections).indexOf(entry.target);
                    currentSectionIndex = index;
                    entry.target.classList.add("section-visible");
                    updateActiveIndicator();
                } else {
                    entry.target.classList.remove("section-visible");
                }
            });
        },
        {
            threshold: 0.8,
        }
    );

    sections.forEach((section) => observer.observe(section));

    navLinks.forEach((navLink) => {
        navLink.addEventListener("click", (event) => {
            event.preventDefault();

            const target = navLink.getAttribute("href");
            const targetSection = document.querySelector(target);

            if (targetSection) {
                const targetIndex = Array.from(sections).indexOf(targetSection);
                currentSectionIndex = targetIndex;

                scrollToSection(currentSectionIndex);
                updateActiveIndicator();
            }
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Tab") {
            event.preventDefault();
            handleCustomTabNavigation();
        }
        if (
            event.key === "ArrowDown" &&
            currentSectionIndex < sections.length - 1
        ) {
            currentSectionIndex++;
            scrollToSection(currentSectionIndex);
            updateActiveIndicator();
        } else if (event.key === "ArrowUp" && currentSectionIndex > 0) {
            currentSectionIndex--;
            scrollToSection(currentSectionIndex);
            updateActiveIndicator();
        }
    });

    function handleCustomTabNavigation() {
        const focusableElements = [
            ...document.querySelectorAll(".indicator"),
            ...document.querySelectorAll(".nav__link a"),
            ...sections,
        ];

        const focusedElement = document.activeElement;
        let nextIndex = focusableElements.indexOf(focusedElement) + 1;

        if (nextIndex >= focusableElements.length) {
            nextIndex = 0;
        }

        const nextElement = focusableElements[nextIndex];
        nextElement.focus();

        if (nextElement.tagName === "SECTION") {
            const targetIndex = Array.from(sections).indexOf(nextElement);
            currentSectionIndex = targetIndex;
            scrollToSection(currentSectionIndex);
            updateActiveIndicator();
        }
    }
};
