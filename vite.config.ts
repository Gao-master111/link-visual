import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const isGithubPages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  plugins: [vue()],
  base: isGithubPages ? '/link-visual/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  build: {
    assetsDir: 'assets',
    outDir: 'dist',
    emptyOutDir: true
  }
})