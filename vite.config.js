import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    // Target modern browsers for smaller bundle size
    target: "es2020",
    // Output directory
    outDir: "dist",
    // Generate source maps for debugging in production (optional)
    sourcemap: false,
    // Minification settings
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Chunk splitting for better caching
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        admin: resolve(__dirname, "admin.html"),
      },
      output: {
        // Asset file naming with hash for cache busting
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        // Manual chunk splitting
        manualChunks: {
          vendor: [],
        },
      },
    },
    // CSS code splitting
    cssCodeSplit: true,
    // Inline assets smaller than 4kb
    assetsInlineLimit: 4096,
  },
  // Preview server settings
  preview: {
    port: 3000,
    strictPort: true,
  },
  // Dev server settings
  server: {
    port: 5173,
    strictPort: false,
    open: true,
  },
});
