import { setScrollDisabled } from "./scrollHandler.js";

function initializeVideoModal() {
    const modal = document.getElementById("videoModal");
    const allContent = document.querySelector(".container");
    let muxPlayer = document.getElementById("muxPlayer");

    const openModal = (container) => {
        setScrollDisabled(true, "Modal Open"); // Added context for debugging
        console.log("Modal opened, scroll disabled."); // Debug log

        if (muxPlayer) {
            muxPlayer.remove();
        }

        setTimeout(() => {
            muxPlayer = document.createElement("mux-player");
            muxPlayer.id = "muxPlayer";
            muxPlayer.setAttribute("stream-type", "on-demand");
            muxPlayer.setAttribute("accent-color", "#ff4e00");
            muxPlayer.setAttribute("disable-cookies", "");
            muxPlayer.setAttribute("autoplay", "");
            muxPlayer.setAttribute("controls", "");

            modal.querySelector(".modal-content").appendChild(muxPlayer);

            requestAnimationFrame(() => {
                const playbackId = container.dataset.playbackId;
                muxPlayer.setAttribute("playback-id", playbackId);
            });

            muxPlayer.addEventListener("loadeddata", () => {
                muxPlayer.play().catch((error) => {
                    console.warn("Video playback failed:", error);
                });
            });

            modal.style.display = "flex";
            allContent.classList.add("blur-background");
        }, 100);
    };

    const closeModal = () => {
        setScrollDisabled(false, "Modal Close"); // Added context for debugging
        console.log("Modal closed, scroll enabled."); // Debug log

        modal.style.display = "none";
        allContent.classList.remove("blur-background");

        if (muxPlayer) {
            muxPlayer.pause();
            setTimeout(() => {
                muxPlayer.remove();
            }, 100);
        }
    };

    window.onclick = (e) => {
        if (e.target === modal) {
            closeModal();
        }
    };

    return { openModal };
}

export { initializeVideoModal };
