import { scrollToSection } from "./scrollTransition.js";

let scrollDisabled = false;
let currentSectionIndex = 0; // Global variable to track the current section index

export const setScrollDisabled = (disabled) => {
    scrollDisabled = disabled;
};

function updateScrollFeedback(sectionName, scrollFeedback) {
    if (scrollFeedback) {
        scrollFeedback.textContent = `Scrolled to ${sectionName} section`;
    }
}

function updateActiveIndicator(
    indicators,
    currentSectionIndex,
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

const handleHashScroll = (sections, indicators, scrollFeedback) => {
    const hash = window.location.hash;
    let targetIndex = null;

    if (hash) {
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            targetIndex = Array.from(sections).indexOf(targetSection);
        }
    }

    if (targetIndex !== null && targetIndex !== -1) {
        scrollToSection(targetIndex);
        updateActiveIndicator(indicators, targetIndex, scrollFeedback);
        currentSectionIndex = targetIndex; // Update global index
    }
};

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
            updateActiveIndicator(indicators, targetIndex, scrollFeedback);
            currentSectionIndex = targetIndex; // Update global index
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
    let isScrolling = false;
    const deadZoneThreshold = 20;
    let startY = 0;

    const onScroll = (event) => {
        if (event.type === "touchstart") {
            startY = event.touches[0].clientY;
            return;
        }

        if (isScrolling || scrollDisabled) return;

        let delta = 0;

        if (event.type === "wheel") {
            delta = event.deltaY;
        } else if (event.type === "touchmove") {
            const currentY = event.touches[0].clientY;
            delta = startY - currentY;
            startY = currentY;
        }

        if (Math.abs(delta) < deadZoneThreshold) return;

        if (delta > 0 && currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
        } else if (delta < 0 && currentSectionIndex > 0) {
            currentSectionIndex--;
        }

        scrollToSection(currentSectionIndex);
        updateActiveIndicator(indicators, currentSectionIndex, scrollFeedback);

        window.requestAnimationFrame(() => {
            setTimeout(() => {
                isScrolling = false;
            }, 600);
        });
    };

    window.addEventListener("wheel", throttle(onScroll, 600));
    window.addEventListener("touchstart", onScroll, { passive: true });
    window.addEventListener("touchmove", throttle(onScroll, 600), {
        passive: true,
    });
}

function handleIntersectionObserver(sections, indicators, scrollFeedback) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const section = entry.target;
                const index = Array.from(sections).indexOf(section);

                if (entry.isIntersecting && index !== -1) {
                    updateActiveIndicator(indicators, index, scrollFeedback);
                    currentSectionIndex = index; // Update global index
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
                scrollFeedback
            );
        } else if (event.key === "ArrowUp" && currentSectionIndex > 0) {
            currentSectionIndex--;
            scrollToSection(currentSectionIndex);
            updateActiveIndicator(
                indicators,
                currentSectionIndex,
                scrollFeedback
            );
        }
    });
}

const handleAnchorNavigation = (sections, scrollFeedback, indicators) => {
    const allAnchors = document.querySelectorAll(
        'a[href^="#"], a[href*=".html#"]'
    );

    allAnchors.forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            event.preventDefault();

            const href = anchor.getAttribute("href");

            if (href.startsWith("#")) {
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const targetIndex =
                        Array.from(sections).indexOf(targetSection);
                    if (targetIndex !== -1) {
                        scrollToSection(targetIndex);
                        updateActiveIndicator(
                            indicators,
                            targetIndex,
                            scrollFeedback
                        );
                        currentSectionIndex = targetIndex; // Update global index
                    }
                }
            }

            if (href.includes(".html#")) {
                const [targetPage, targetHash] = href.split("#");
                sessionStorage.setItem("targetHash", targetHash);
                window.location.href = targetPage;
            }
        });
    });

    const storedHash = sessionStorage.getItem("targetHash");
    if (storedHash) {
        window.addEventListener("load", () => {
            const newTargetSection = document.querySelector(`#${storedHash}`);
            if (newTargetSection) {
                const targetIndex =
                    Array.from(sections).indexOf(newTargetSection);
                if (targetIndex !== -1) {
                    scrollToSection(targetIndex);
                    updateActiveIndicator(
                        indicators,
                        targetIndex,
                        scrollFeedback
                    );
                    currentSectionIndex = targetIndex; // Update global index
                    sessionStorage.removeItem("targetHash");
                }
            }
        });
    }
};

export const initScrollHandler = (sections) => {
    if (!sections || !sections.length) {
        console.error("Invalid sections passed to initScrollHandler.");
        return;
    }

    const indicators = document.querySelectorAll(".indicator");
    const scrollFeedback = document.getElementById("scrollFeedback");

    initializeIndicators(indicators, sections, scrollFeedback);
    handleScrollEvent(sections, indicators, scrollFeedback);
    handleIntersectionObserver(sections, indicators, scrollFeedback);
    handleKeyboardNavigation(sections, indicators, scrollFeedback);
    handleHashScroll(sections, indicators, scrollFeedback);
    handleAnchorNavigation(sections, scrollFeedback, indicators);

    window.addEventListener("hashchange", () => {
        handleHashScroll(sections, indicators, scrollFeedback);
    });
};
