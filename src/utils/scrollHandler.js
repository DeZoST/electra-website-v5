import { scrollToSection } from "./scrollTransition.js";
import { initTouchHandler } from "./touchHandler.js";

let scrollDisabled = false;

export const setScrollDisabled = (disabled, source) => {
    scrollDisabled = disabled;
    console.log(`Scroll disabled: ${disabled} - Source: ${source}`);
};

function updateScrollFeedback(sectionName, scrollFeedback) {
    if (scrollFeedback) {
        scrollFeedback.textContent = `Scrolled to ${sectionName} section`;
    }
}

function updateActiveIndicator(
    indicators,
    currentSectionIndex,
    sections,
    scrollFeedback
) {
    if (!indicators) return;

    indicators = [...indicators];

    if (!Array.isArray(indicators)) {
        console.error("Invalid parameters passed to updateActiveIndicator.");
        return;
    }
    indicators.forEach((indicator) => {
        indicator.classList.remove("active");
        indicator.setAttribute("aria-current", "false");
    });

    const activeIndicator = indicators[currentSectionIndex];
    if (activeIndicator) {
        activeIndicator.classList.add("active");
        activeIndicator.setAttribute("aria-current", "true");

        const target = activeIndicator.getAttribute("data-target");
        const targetSection = document.querySelector(target);
        if (targetSection) {
            const sectionName =
                targetSection.getAttribute("aria-label") || targetSection.id;
            updateScrollFeedback(sectionName, scrollFeedback);
        }
    }
}

function handleIndicatorNavigation(
    indicator,
    sections,
    indicators,
    scrollFeedback
) {
    if (!indicator || !sections || !indicators) return;
    const target = indicator.getAttribute("data-target");
    const targetSection = document.querySelector(target);
    if (targetSection) {
        const targetIndex = Array.from(sections).indexOf(targetSection);
        if (targetIndex !== -1) {
            scrollToSection(targetIndex);
            updateActiveIndicator(
                indicators,
                targetIndex,
                sections,
                scrollFeedback
            );
            indicator.focus();
        }
    }
}

function initializeIndicators(indicators, sections, scrollFeedback) {
    if (!indicators || !sections) return;

    indicators.forEach((indicator) => {
        indicator.setAttribute("role", "button");
        indicator.setAttribute("tabindex", "0");

        indicator.addEventListener("click", (event) => {
            event.preventDefault();
            handleIndicatorNavigation(
                indicator,
                sections,
                indicators,
                scrollFeedback
            );
        });

        indicator.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleIndicatorNavigation(
                    indicator,
                    sections,
                    indicators,
                    scrollFeedback
                );
            }
        });
    });
}

function throttle(func, delay) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), delay);
        }
    };
}

function handleScrollEvent(sections, indicators, scrollFeedback) {
    let currentSectionIndex = 0;
    let isScrolling = false;

    const onScroll = (event) => {
        if (isScrolling || scrollDisabled) return;

        const delta = event.deltaY;
        isScrolling = true;

        if (delta > 0 && currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
        } else if (delta < 0 && currentSectionIndex > 0) {
            currentSectionIndex--;
        }

        scrollToSection(currentSectionIndex);
        updateActiveIndicator(
            indicators,
            currentSectionIndex,
            sections,
            scrollFeedback
        );

        window.requestAnimationFrame(() => {
            setTimeout(() => {
                isScrolling = false;
            }, 600);
        });
    };

    window.addEventListener("wheel", throttle(onScroll, 600));
}

function handleTouchEvents(sections, indicators, scrollFeedback) {
    const sectionsArray = [...sections];

    initTouchHandler(
        sectionsArray,
        (index) => {
            console.log(
                "handleTouchEvents -> callback triggered for index:",
                index
            );
            updateActiveIndicator(indicators, index, sections, scrollFeedback);
        },
        scrollDisabled
    );
}

function handleIntersectionObserver(sections, indicators, scrollFeedback) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const section = entry.target;
                const index = Array.from(sections).indexOf(section);

                if (entry.isIntersecting && index !== -1) {
                    updateActiveIndicator(
                        indicators,
                        index,
                        sections,
                        scrollFeedback
                    );
                    section.classList.add("section-visible");
                } else {
                    section.classList.remove("section-visible");
                }
            });
        },
        { threshold: 0.8 }
    );

    sections.forEach((section) => observer.observe(section));
}

function handleKeyboardNavigation(sections, indicators, scrollFeedback) {
    let currentSectionIndex = 0;
    document.addEventListener("keydown", (event) => {
        if (
            event.key === "ArrowDown" &&
            currentSectionIndex < sections.length - 1
        ) {
            currentSectionIndex++;
            scrollToSection(currentSectionIndex);
            updateActiveIndicator(
                indicators,
                currentSectionIndex,
                sections,
                scrollFeedback
            );
        } else if (event.key === "ArrowUp" && currentSectionIndex > 0) {
            currentSectionIndex--;
            scrollToSection(currentSectionIndex);
            updateActiveIndicator(
                indicators,
                currentSectionIndex,
                sections,
                scrollFeedback
            );
        }
    });
}

export const initScrollHandler = (sections) => {
    if (!sections || !sections.length) {
        console.error("Invalid sections passed to initScrollHandler.");
        return;
    }

    const indicators = document.querySelectorAll(".indicator");
    const scrollFeedback = document.getElementById("scrollFeedback");

    initializeIndicators(indicators, sections, scrollFeedback);
    handleScrollEvent(sections, indicators, scrollFeedback);
    handleTouchEvents(sections, indicators, scrollFeedback);
    handleIntersectionObserver(sections, indicators, scrollFeedback);
    handleKeyboardNavigation(sections, indicators, scrollFeedback);
};
