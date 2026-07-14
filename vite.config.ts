import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 判断是否GitHub Pages打包
const isGithubPages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  plugins: [vue()],
  // 线上用/link-visual/，本地用/
  base: isGithubPages ? '/link-visual/' : '/',
  build: {
    assetsDir: 'assets',
    emptyOutDir: true
  }
})