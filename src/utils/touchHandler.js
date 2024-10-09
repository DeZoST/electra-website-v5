export const initTouchHandler = (sections, scrollToSection) => {
    let startY = 0;
    let currentSectionIndex = 0;

    const onTouchStart = (event) => {
        startY = event.touches[0].clientY;
    };

    const onTouchEnd = (event) => {
        if (scrollDisabled) return;
        const endY = event.changedTouches[0].clientY;
        const deltaY = startY - endY;

        if (deltaY > 100 && currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
        } else if (deltaY < -100 && currentSectionIndex > 0) {
            currentSectionIndex--;
        }

        scrollToSection(currentSectionIndex);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
};
