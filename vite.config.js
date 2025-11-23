import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Load environment variables
const webappName = process.env.VITE_NEPTUNE_WEBAPP_NAME || "smoketest";

export default defineConfig({
    base: `/webapp/${webappName}/`, // MUST match the Neptune Web App "Name"
    plugins: [vue()],
    build: {
        outDir: "dist", // Neptune expects build output here
        assetsDir: "assets", // Assets will be in dist/assets/
    },
});

