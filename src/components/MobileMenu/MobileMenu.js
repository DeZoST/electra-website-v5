import { setScrollDisabled } from "../../utils/scrollHandler.js";
import { scrollToSection } from "../../utils/scrollTransition.js";

// Get the page type from the body attribute
const getPageType = () => document.body.getAttribute("data-type");

export const initMobileMenu = () => {
    const menuToggle = document.getElementById("menu-toggle");

    if (!menuToggle) {
        console.error("Menu toggle button not found.");
        return;
    }

    const pageType = getPageType(); // Get the current page type

    const mobileMenu = document.createElement("div");
    mobileMenu.classList.add("mobile-menu");
    mobileMenu.style.display = "none";
    mobileMenu.innerHTML = `
        <button class="mobile-menu__close"></button>
        <ul class="mobile-menu__links">
            <li class="mobile-menu__link">
                <a href="${
                    pageType === "home" ? "#home" : "./index.html#home"
                }">Directors</a>
            </li>
            <li class="mobile-menu__link">
                <a href="${
                    pageType === "home" ? "#about" : "./index.html#about"
                }">About</a>
            </li>
            <li class="mobile-menu__link">
                <a href="${
                    pageType === "home" ? "#reps" : "./index.html#reps"
                }">Contact</a>
            </li>
        </ul>
    `;
    document.body.appendChild(mobileMenu);

    const closeMenu = () => {
        mobileMenu.classList.remove("open");
        mobileMenu.style.display = "none";
        setScrollDisabled(false);
    };

    const toggleMenu = (event) => {
        event.stopPropagation();
        const isOpen = mobileMenu.classList.toggle("open");
        setScrollDisabled(isOpen);

        if (isOpen) {
            mobileMenu.style.display = "flex";
            menuToggle.setAttribute("aria-expanded", "true");
            mobileMenu.setAttribute("aria-hidden", "false");
            mobileMenu.querySelector("a").focus();
        } else {
            mobileMenu.style.display = "none";
            menuToggle.setAttribute("aria-expanded", "false");
            mobileMenu.setAttribute("aria-hidden", "true");
            menuToggle.focus();
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
    if (closeButton) {
        closeButton.addEventListener("click", closeMenu);
    } else {
        console.error("Close button not found.");
    }

    const menuLinks = mobileMenu.querySelectorAll(".mobile-menu__link a");
    menuLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const fullHref = link.getAttribute("href");
            const hashIndex = fullHref.indexOf("#");

            const target = fullHref.substring(hashIndex);

            const targetSection = document.querySelector(target);

            if (targetSection) {
                const sections = document.querySelectorAll("section");
                const targetIndex = Array.from(sections).indexOf(targetSection);

                scrollToSection(targetIndex);
                closeMenu();
            } else {
                console.error(`Target section ${target} not found.`);
            }
        });
    });

    window.addEventListener("resize", manageMenuToggle);
};

import "./MobileMenu.css";
