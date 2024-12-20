export function loadHeader() {
    const pageType = document.body.getAttribute("data-type");

    const header = document.createElement("header");
    header.className = "header";
    header.setAttribute("role", "banner");
    header.setAttribute("aria-label", "Header");

    header.innerHTML = `
        <a href="/" class="logo">
            <img src="/assets/images/Electra_Orange.webp" alt="Electra Logo" loading="lazy" />
        </a>
        <nav class="nav-menu" aria-label="Main Navigation Menu">
            <ul class="nav__links">
                <li class="nav__link">
                    <a href="${
                        pageType === "home" ? "#home" : "/index.html#home"
                    }">Directors</a>
                </li>
                <li class="nav__link">
                    <a href="${
                        pageType === "home" ? "#about" : "/index.html#about"
                    }">About</a>
                </li>
                <li class="nav__link">
                    <a href="${
                        pageType === "home" ? "#reps" : "/index.html#reps"
                    }">Contact</a>
                </li>
            </ul>
            <button id="menu-toggle" aria-label="Open main menu" class="menu-toggle">
                <img src="/assets/images/Bolt_Star_Orange.webp" alt="Main Navigation Menu" loading="lazy" />
            </button>
        </nav>
    `;

    const bodyElement = document.body;
    if (!bodyElement) {
        console.error("Body element not found.");
        return;
    }

    bodyElement.insertAdjacentElement("afterbegin", header);
}

import "./Header.css";
