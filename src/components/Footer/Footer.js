export function loadFooter() {
    const footerHTML = `
        <footer class="footer" role="contentinfo" aria-label="Footer">
            <img class="footer__logo" src="/electra-website-v5/assets/images/Electra_White.webp" alt="Electra Logo" loading="lazy" />
            <ul class="footer_socials_wrapper">
                <li><a class="footer_social" target="_blank" href="https://www.instagram.com/electrafilmworks/" aria-label="Instagram">
                    <img src="/electra-website-v5/assets/images/instagram_logo_white.webp" alt="Instagram Logo" loading="lazy" />
                </a></li>
                <li><a class="footer_social" target="_blank" href="https://www.linkedin.com/in/electra-filmworks-984b242a4/" aria-label="LinkedIn">
                    <img src="/electra-website-v5/assets/images/linkedin_logo_white.webp" alt="LinkedIn Logo" loading="lazy" />
                </a></li>
            </ul>
            <div class="footer__pattern"></div>
        </footer>
    `;

    const mainSection = document.querySelector("main");
    if (!mainSection) {
        console.error("Main section not found.");
        return;
    }

    const lastSection = mainSection.querySelector("section:last-of-type");
    if (lastSection) {
        lastSection.insertAdjacentHTML("beforeend", footerHTML);
    } else {
        console.error("No sections found in main.");
    }
}

import "./Footer.css";
