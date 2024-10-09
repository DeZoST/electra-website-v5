import { setScrollDisabled } from "./scrollHandler.js";

export const initMobileMenu = () => {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.createElement("div");
    mobileMenu.classList.add("mobile-menu");
    mobileMenu.style.display = "none";
    mobileMenu.innerHTML = `
        <ul class="mobile-menu__links">
            <li class="mobile-menu__link"><a href="#about">Directors</a></li>
            <li class="mobile-menu__link"><a href="#contact">About</a></li>
            <li class="mobile-menu__link"><a href="#services">Contact</a></li>
        </ul>
    `;
    document.body.appendChild(mobileMenu);

    const toggleMenu = (event) => {
        event.stopPropagation();
        const isOpen = mobileMenu.classList.toggle("open");
        setScrollDisabled(isOpen, "Mobile Menu Toggle"); // Added context for debugging
        console.log(
            `Mobile menu ${
                isOpen ? "opened" : "closed"
            }, scroll disabled: ${isOpen}`
        ); // Debug log

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
            mobileMenu.classList.remove("open");
            mobileMenu.style.display = "none";
            setScrollDisabled(false, "Manage Menu Toggle"); // Added context
        }
    };

    manageMenuToggle();

    window.addEventListener("click", (event) => {
        if (
            mobileMenu.classList.contains("open") &&
            !mobileMenu.contains(event.target) &&
            event.target !== menuToggle
        ) {
            // Only disable scroll if the mobile menu is open and a click is outside of it
            mobileMenu.classList.remove("open");
            mobileMenu.style.display = "none";
            setScrollDisabled(false, "Outside Mobile Menu Click");
            console.log(
                "Clicked outside mobile menu, menu closed, scroll enabled."
            );
        }
    });

    window.addEventListener("resize", manageMenuToggle);
};
