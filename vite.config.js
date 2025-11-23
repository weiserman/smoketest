import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    base: "/webapp/fleetdemo/", // MUST match the Neptune Web App "Name"
    plugins: [vue()],
    build: {
        outDir: "dist", // Neptune expects build output here
        assetsDir: "assets", // Assets will be in dist/assets/
    },
});

