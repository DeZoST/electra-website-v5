import { setScrollDisabled } from "./scrollHandler.js";
import { scrollToSection } from "./scrollTransition.js";

export const initMobileMenu = () => {
    const menuToggle = document.getElementById("menu-toggle");

    // Create the mobile menu container
    const mobileMenu = document.createElement("div");
    mobileMenu.classList.add("mobile-menu");
    mobileMenu.style.display = "none";
    mobileMenu.innerHTML = `
        <button class="mobile-menu__close"></button>
        <ul class="mobile-menu__links">
            <li class="mobile-menu__link"><a href="#home">Directors</a></li>
            <li class="mobile-menu__link"><a href="#about">About</a></li>
            <li class="mobile-menu__link"><a href="#reps">Contact</a></li>
        </ul>
    `;
    document.body.appendChild(mobileMenu);

    const closeMenu = () => {
        mobileMenu.classList.remove("open");
        mobileMenu.style.display = "none";
        setScrollDisabled(false, "Mobile Menu Close");
        console.log("Mobile menu closed, scroll enabled.");
    };

    const toggleMenu = (event) => {
        event.stopPropagation();
        const isOpen = mobileMenu.classList.toggle("open");
        setScrollDisabled(isOpen, "Mobile Menu Toggle");
        console.log(
            `Mobile menu ${
                isOpen ? "opened" : "closed"
            }, scroll disabled: ${isOpen}`
        );

        if (isOpen) {
            mobileMenu.style.display = "flex";
        } else {
            mobileMenu.style.display = "none";
        }
    };

    // Menu toggle button
    const manageMenuToggle = () => {
        if (window.innerWidth <= 768) {
            menuToggle.addEventListener("click", toggleMenu);
        } else {
            menuToggle.removeEventListener("click", toggleMenu);
            closeMenu();
        }
    };

    manageMenuToggle();

    // Add event listener for the close button
    const closeButton = mobileMenu.querySelector(".mobile-menu__close");
    closeButton.addEventListener("click", closeMenu);

    // **Mobile Menu Link Click Handling**
    const menuLinks = mobileMenu.querySelectorAll(".mobile-menu__link a");
    menuLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const target = link.getAttribute("href");
            const targetSection = document.querySelector(target);

            if (targetSection) {
                const sections = document.querySelectorAll("section"); // Assuming sections are all 'section' elements
                const targetIndex = Array.from(sections).indexOf(targetSection);

                // Custom scroll to the section
                scrollToSection(targetIndex);

                console.log(
                    `Mobile menu link clicked. Navigated to section: ${target}, index updated to: ${targetIndex}`
                );

                closeMenu();
            }
        });
    });

    // Handle screen resizing
    window.addEventListener("resize", manageMenuToggle);
};
