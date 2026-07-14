import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/link-visual/',  // 和仓库名完全一致，前后都有斜杠
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})