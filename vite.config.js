import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import { resolve } from "path";

export default defineConfig({
    base: "/",
    build: {
        target: "esnext",
        cssCodeSplit: true,
        minify: "esbuild",
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
                    if (id.includes("node_modules")) {
                        return "vendor";
                    }
                },
                chunkFileNames: "assets/js/[name]-[hash].js",
                entryFileNames: "assets/js/[name]-[hash].js",
                assetFileNames: ({ name }) => {
                    if (/\.(css|js)$/.test(name ?? "")) {
                        return "assets/[ext]/[name]-[hash].[ext]";
                    }
                    return "assets/[name]-[hash].[ext]";
                },
            },
        },
    },
    plugins: [
        viteCompression({
            algorithm: "gzip",
            ext: ".gz",
            threshold: 10240,
            deleteOriginFile: false,
        }),
    ],
});
