/**
 * Transitions the view to the target section by applying a `translateY` transform.
 * This function adjusts the `transform` property of the container element to move
 * the view to the appropriate section based on the index provided. Each section takes
 * up the full viewport height, so the container is moved vertically by a multiple of the viewport height.
 *
 * @param {number} sectionIndex - The index of the section to scroll to.
 */
export const scrollToSection = (sectionIndex) => {
    const main = document.querySelector("main");
    const sectionHeight = window.innerHeight;

    // Use requestAnimationFrame for smoother transitions
    window.requestAnimationFrame(() => {
        main.style.transform = `translateY(-${sectionHeight * sectionIndex}px)`;
    });
};
