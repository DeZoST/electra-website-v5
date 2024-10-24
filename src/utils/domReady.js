export default function domReady(callback) {
    if (typeof callback !== "function") {
        console.error("Callback passed to domReady is not a function.");
        return;
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", callback);
    } else {
        callback();
    }
}
