import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import { resolve } from "path";

export default defineConfig({
    base: "/",
    build: {
        target: "esnext",
        cssCodeSplit: true, // Déjà activé pour diviser le CSS
        minify: "esbuild", // Utiliser esbuild pour la minification
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                lorenzo: resolve(__dirname, "pages/lorenzo/index.html"),
                anthony: resolve(__dirname, "pages/anthony/index.html"),
                kailee: resolve(__dirname, "pages/kailee/index.html"),
                ben: resolve(__dirname, "pages/ben/index.html"),
                zev: resolve(__dirname, "pages/zeev/index.html"),
            },
            output: {
                manualChunks(id) {
                    // Cela divise les bibliothèques tierces (comme 'vendor') et le code partagé
                    if (id.includes("node_modules")) {
                        return "vendor";
                    }
                },
                chunkFileNames: "assets/js/[name]-[hash].js", // Nommer les fichiers JS optimisés
                entryFileNames: "assets/js/[name]-[hash].js", // Nommer les fichiers JS d'entrée
                assetFileNames: ({ name }) => {
                    if (/\.(css|js)$/.test(name ?? "")) {
                        return "assets/[ext]/[name]-[hash].[ext]"; // Organiser les fichiers CSS et JS
                    }
                    return "assets/[name]-[hash].[ext]"; // Organiser d'autres fichiers
                },
            },
        },
    },
    plugins: [
        viteCompression({
            algorithm: "gzip", // Compresser en gzip
            ext: ".gz", // Extension du fichier compressé
            threshold: 10240, // Seuil de compression (10 KB)
            deleteOriginFile: false, // Conserver les fichiers originaux non compressés
        }),
    ],
});
