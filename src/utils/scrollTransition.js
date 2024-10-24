export const scrollToSection = (sectionIndex) => {
    try {
        const main = document.querySelector("main");
        if (!main) {
            throw new Error("Main element not found.");
        }

        const sectionHeight = window.innerHeight;
        window.requestAnimationFrame(() => {
            main.style.transform = `translateY(-${
                sectionHeight * sectionIndex
            }px)`;
        });
    } catch (error) {
        console.error("Error during scrollToSection: ", error);
    }
};
