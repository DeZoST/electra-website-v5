import { setScrollDisabled } from "../../utils/scrollHandler.js";

export function initializeVideoModal() {
    const modal = document.createElement("div");
    modal.id = "videoModal";
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content"></div>
    `;
    document.body.appendChild(modal);

    const allContent = document.querySelector(".container");
    let muxPlayer;

    const openModal = (container) => {
        setScrollDisabled(true, "Modal Open");
        console.log("Modal opened, scroll disabled.");

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

            const playbackId = container.dataset.playbackId;
            muxPlayer.setAttribute("playback-id", playbackId);

            modal.querySelector(".modal-content").appendChild(muxPlayer);

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
        setScrollDisabled(false, "Modal Close");
        console.log("Modal closed, scroll enabled.");

        modal.style.display = "none";
        allContent.classList.remove("blur-background");

        if (muxPlayer && typeof muxPlayer.pause === "function") {
            muxPlayer.pause();
            setTimeout(() => {
                muxPlayer.remove();
                muxPlayer = null;
            }, 100);
        }
    };

    window.onclick = (e) => {
        if (e.target === modal) {
            closeModal();
        }
    };

    document.addEventListener("click", (event) => {
        const videoContainer = event.target.closest(
            ".featured__project__video"
        );
        if (videoContainer) {
            openModal(videoContainer);
        }
    });

    return { openModal, closeModal };
}

import "./VideoModal.css";
