import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": "http://localhost:5157", // Ajuste para o backend correto
        },
        port: 54513, // Porta do frontend
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"), // Definição do alias
        },
    },
});
