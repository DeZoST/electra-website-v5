// import { initializeVideoModal } from "./videoModal.js";

/* function initializeGifHoverEffect() {
    const hoverContainers = document.querySelectorAll(
        ".featured__project__video"
    );
    const { openModal } = initializeVideoModal();

    hoverContainers.forEach((container) => {
        const staticImage = container.querySelector(
            ".featured__project__thumbnail"
        );
        const gifImage = container.querySelector(".lazy-gif");
        const gifSrc = gifImage.getAttribute("data-gif");
        let gifLoaded = false;

        const loadGif = () => {
            if (
                !gifLoaded &&
                (!gifImage.getAttribute("src") ||
                    gifImage.getAttribute("src") === "")
            ) {
                gifImage.setAttribute("src", gifSrc);
                gifImage.onload = () => {
                    gifLoaded = true;
                    showGif();
                };
            } else if (gifLoaded) {
                showGif();
            }
        };

        const showGif = () => {
            gifImage.style.opacity = "1";
            gifImage.style.zIndex = "1";
            staticImage.style.opacity = "0";
        };

        const hideGif = () => {
            gifImage.style.opacity = "0";
            gifImage.style.zIndex = "-1";
            staticImage.style.opacity = "1";
        };

        container.addEventListener("mouseenter", loadGif);
        container.addEventListener("mouseleave", hideGif);
        container.addEventListener("click", () => openModal(container));
    });
} */

function preloadMuxPlayers() {
    const videoOverlay = document.querySelector(".director-video-overlay");
    const playbackIds = {
        "Lorenzo De Guia": "gGoBWuRAWgcPXXlYHG84J2O015fSMFQDks01GAe00j01a0100",
        "Anthony Garth": "v8DYXI02Kn4EpzYB7h28H18bWabA702t61RVZwtNt3O5c",
        "Kailee McGee": "RqFtPFucL94VI5T00g51r2j5z0201YbnTDWm4KWyHwnwp4",
        "Ben Weinstein": "009NxNz3Z302hc02WE7NTi02LZAY9FjQHlxg14vpbyPnyX00",
        "Ze'ev Waismann": "GMWX1Z3aR9J01XycOHiRN3e3hAdg8ZqSR401jQqIQ402SI",
    };

    const muxPlayers = {};

    Object.entries(playbackIds).forEach(([directorName, playbackId]) => {
        const muxPlayer = document.createElement("mux-player");
        muxPlayer.setAttribute("stream-type", "on-demand");
        muxPlayer.setAttribute("autoplay", "true");
        muxPlayer.setAttribute("muted", "true");
        muxPlayer.setAttribute("loop", "true");
        muxPlayer.setAttribute("disable-cookies", "true");
        muxPlayer.setAttribute("playsinline", "true");
        muxPlayer.setAttribute("playback-id", playbackId);

        muxPlayer.style.width = "100%";
        muxPlayer.style.height = "100%";
        muxPlayer.style.objectFit = "cover";
        muxPlayer.style.position = "absolute";
        muxPlayer.style.top = "0";
        muxPlayer.style.left = "0";
        muxPlayer.style.opacity = "0";
        muxPlayer.style.zIndex = "-1";
        muxPlayer.style.display = "none";

        videoOverlay.appendChild(muxPlayer);
        muxPlayers[directorName] = muxPlayer;
    });

    return muxPlayers;
}

function initializeDirectorVideoHoverEffect(muxPlayers) {
    const directorLinks = document.querySelectorAll(".home__director a");
    const videoOverlay = document.querySelector(".director-video-overlay");

    directorLinks.forEach((link) => {
        const directorName = link.textContent.trim();
        const muxPlayer = muxPlayers[directorName];

        if (!muxPlayer) return;

        const showVideo = () => {
            muxPlayer.style.display = "block";
            videoOverlay.style.opacity = "1";
            videoOverlay.style.zIndex = "1";
            muxPlayer.style.opacity = "1";
            muxPlayer.style.zIndex = "1";
        };

        const hideVideo = () => {
            muxPlayer.style.opacity = "0";
            muxPlayer.style.zIndex = "-1";
            videoOverlay.style.opacity = "0";
            videoOverlay.style.zIndex = "-1";
        };

        link.addEventListener("mouseenter", showVideo);
        link.addEventListener("mouseleave", hideVideo);
    });
}

function initializeAllHoverEffects() {
    //initializeGifHoverEffect();
    const muxPlayers = preloadMuxPlayers();
    initializeDirectorVideoHoverEffect(muxPlayers);
}

export { initializeAllHoverEffects };
