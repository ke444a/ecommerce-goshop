import { defineConfig } from "cypress";

export default defineConfig({
    component: {
        devServer: {
            framework: "react",
            bundler: "vite",
        },
    },

    e2e: {
        baseUrl: "http://localhost:5173/"
    },
    env: {
        apiUrl: "http://localhost:5000",
        frontendUrl: "http://localhost:5173/"
    }
});
