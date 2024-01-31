import { defineConfig } from "vite";
import type { VitePWAOptions } from "vite-plugin-pwa";
import { VitePWA as pwa } from "vite-plugin-pwa";
import solid from "vite-plugin-solid";

const pwaOptions: Partial<VitePWAOptions> = {
  srcDir: "src",
  filename: "worker/instances/service-worker.ts",
  strategies: "injectManifest",
  manifest: {
    name: "Nuzlog PWA",
    short_name: "Nuzlog",
    theme_color: "#af87ff",
    icons: [
      {
        src: "pwa/pwa-64x64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "pwa/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "pwa/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "pwa/maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    related_applications: [
      {
        platform: "webapp",
        url: "https://nuzlog.netlify.app/manifest.webmanifest",
      },
    ],
  },
  injectManifest: {
    globPatterns: ["**/*.{js,css,html,svg,png}"],
  },

  devOptions: {
    navigateFallback: "index.html",
  },
};

export default defineConfig({
  plugins: [solid(), pwa(pwaOptions)],
  preview: {
    port: 3001,
  },
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    testTransformMode: { web: ["*.ts", "*.tsx"] },
    setupFiles: ["./src/test-setup.tsx"],
    deps: {
      optimizer: {
        web: {
          enabled: true,
          exclude: ["solid-js"],
        },
      },
    },
    coverage: {
      provider: "v8",
      exclude: [
        "**/*.config.js",
        "**/*.config.ts",
        "**/*.gen.ts",
        "**/*.d.ts",
        "**/.eslintrc.cjs",
        "scripts/",
        "src/index.tsx",
        "src/worker/instances/*.ts",
        "src/database/query-builder.ts",
        "**/_layout.tsx",
        "src/pages/**/*.tsx",
      ],
      thresholds: {
        "100": true,
      },
    },
  },
});
