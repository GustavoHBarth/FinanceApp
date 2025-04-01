import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // "/api": "http://localhost:5157", // Altere para a URL configurada em 'launchSettings.json'
            // Ou, se preferir, use a versão HTTPS:
             "/api": "https://localhost:7020", // Caso esteja utilizando HTTPS
        },
        port: 54513, // Porta do frontend
    },
});
