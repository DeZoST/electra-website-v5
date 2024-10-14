import { setScrollDisabled } from "../../utils/scrollHandler.js";
import { scrollToSection } from "../../utils/scrollTransition.js";

export const initMobileMenu = () => {
    const menuToggle = document.getElementById("menu-toggle");

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
    };

    const toggleMenu = (event) => {
        event.stopPropagation();
        const isOpen = mobileMenu.classList.toggle("open");
        setScrollDisabled(isOpen, "Mobile Menu Toggle");

        if (isOpen) {
            mobileMenu.style.display = "flex";
        } else {
            mobileMenu.style.display = "none";
        }
    };

    const manageMenuToggle = () => {
        if (window.innerWidth <= 768) {
            menuToggle.addEventListener("click", toggleMenu);
        } else {
            menuToggle.removeEventListener("click", toggleMenu);
            closeMenu();
        }
    };

    manageMenuToggle();

    const closeButton = mobileMenu.querySelector(".mobile-menu__close");
    closeButton.addEventListener("click", closeMenu);

    const menuLinks = mobileMenu.querySelectorAll(".mobile-menu__link a");
    menuLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const target = link.getAttribute("href");
            const targetSection = document.querySelector(target);

            if (targetSection) {
                const sections = document.querySelectorAll("section");
                const targetIndex = Array.from(sections).indexOf(targetSection);

                scrollToSection(targetIndex);
                closeMenu();
            }
        });
    });

    window.addEventListener("resize", manageMenuToggle);
};

import "./MobileMenu.css";
