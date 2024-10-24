export function loadHomeSection(insertPosition) {
    const homeSection = document.createElement("section");
    homeSection.id = insertPosition === "first" ? "home" : "others";
    homeSection.className =
        insertPosition === "last" ? "home section" : "home section container";

    homeSection.innerHTML = `
        <nav class="home__container">
            <h1 class="home__title">Directors</h1>
            <ul class="home__directors">
                <li class="home__director"><a href="pages/lorenzo/index.html">Lorenzo De Guia</a></li>
                <li class="home__director"><a href="pages/anthony/index.html">Anthony Garth</a></li>
                <li class="home__director"><a href="pages/kailee/index.html">Kailee McGee</a></li>
                <li class="home__director"><a href="pages/ben/index.html">Ben Weinstein</a></li>
                <li class="home__director"><a href="pages/zeev/index.html">Ze'ev Waismann</a></li>
            </ul>
        </nav>
        <lord-icon class="scroll-down-line" src="https://cdn.lordicon.com/ksmzzfxc.json" trigger="loop" stroke="bold" state="loop-slide" colors="primary:#ff4e00,secondary:#ef9622"></lord-icon>
    `;

    const mainSection = document.querySelector("main");
    if (!mainSection) {
        console.error("Main section not found.");
        return;
    }

    if (insertPosition === "first") {
        mainSection.prepend(homeSection);
    } else {
        mainSection.appendChild(homeSection);
    }
}

import "./HomeSection.css";
