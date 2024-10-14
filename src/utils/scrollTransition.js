export const scrollToSection = (sectionIndex) => {
    const main = document.querySelector("main");
    const sectionHeight = window.innerHeight;

    window.requestAnimationFrame(() => {
        main.style.transform = `translateY(-${sectionHeight * sectionIndex}px)`;
    });
};
