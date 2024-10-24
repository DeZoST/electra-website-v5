export const initTouchHandler = (sections, scrollToSection, scrollDisabled) => {
    if (!Array.isArray(sections) || typeof scrollToSection !== "function") {
        console.error("Invalid parameters passed to initTouchHandler.");
        return;
    }

    let startY = 0;
    let currentSectionIndex = 0;
    let isTouching = false;

    const handleTouchStart = (event) => {
        if (scrollDisabled) return;
        if (!event.touches || event.touches.length === 0) return;
        startY = event.touches[0].clientY;
        isTouching = true;
    };

    const handleTouchMove = (event) => {
        if (
            !isTouching ||
            scrollDisabled ||
            !event.touches ||
            event.touches.length === 0
        )
            return;
        const currentY = event.touches[0].clientY;
        const deltaY = startY - currentY;

        handleScroll(deltaY);
    };

    const handleTouchEnd = () => {
        isTouching = false;
    };

    const handleScroll = (deltaY) => {
        const threshold = 50;

        if (Math.abs(deltaY) > threshold) {
            if (deltaY > 0 && currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
            } else if (deltaY < 0 && currentSectionIndex > 0) {
                currentSectionIndex--;
            }

            scrollToSection(currentSectionIndex);
        }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
};
