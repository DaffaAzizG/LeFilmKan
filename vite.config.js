import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outdir: "build",
  },
  server: {
    host: true,
    allowedHosts: [".ngrok-free.app"],
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "LeFilmKan",
        short_name: "LFK",
        description:
          "Movie collection finder application that uses the TMDB API.",
        theme_color: "#111113",
        icons: [
          {
            src: "/Add_a_heading-removebg-preview.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/Add_a_heading-removebg-preview.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      components: `${path.resolve(__dirname, "./src/components")}`,
      config: `${path.resolve(__dirname, "./src/config")}`,
      dataservices: `${path.resolve(__dirname, "./src/dataservices")}`,
      helpers: `${path.resolve(__dirname, "./src/helpers")}`,
      hooks: `${path.resolve(__dirname, "./src/hooks")}`,
      init: `${path.resolve(__dirname, "./src/init")}`,
      layouts: `${path.resolve(__dirname, "./src/layouts")}`,
      pages: `${path.resolve(__dirname, "./src/pages")}`,
      themes: `${path.resolve(__dirname, "./src/themes")}`,
      types: `${path.resolve(__dirname, "./src/types")}`,
      viewports: `${path.resolve(__dirname, "./src/viewports")}`,
    },
  },
});
