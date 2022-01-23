import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  plugins: [vue()],
  base: "/",
  server: {
    host: true,
    port: 8086,
  },
  build: {
    assetsDir: "index.assets",
    assetsInlineLimit: 65536,
  },
})
