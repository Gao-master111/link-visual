import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // 关键：监听所有网卡，允许局域网访问
    port: 5173,
    open: false
  }
})