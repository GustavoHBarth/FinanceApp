// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 54513,
        proxy: {
            "/api": {
                target: "https://localhost:7020",
                changeOrigin: true,
                secure: false, // necessário porque o certificado é autoassinado
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});
