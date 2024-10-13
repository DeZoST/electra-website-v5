import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import { resolve } from "path";

export default defineConfig({
    base: "/electra-website-v5/",
    build: {
        target: "esnext",
        minify: "esbuild",
        cssCodeSplit: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                lorenzo: resolve(__dirname, "public/pages/lorenzo/index.html"),
                anthony: resolve(__dirname, "public/pages/anthony/index.html"),
                kailee: resolve(__dirname, "public/pages/kailee/index.html"),
                ben: resolve(__dirname, "public/pages/ben/index.html"),
                zev: resolve(__dirname, "public/pages/zeev/index.html"),
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
