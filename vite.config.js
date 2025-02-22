import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // 允许外部访问
    port: 3000, // 设置端口号
    open: true, // 自动打开浏览器
    cors: true,  // 允许跨域
    proxy: {
      '/api': {
        target: 'http://192.168.3.22:8000',
        changeOrigin: true,
        secure: false,
        headers: {
          'Access-Control-Allow-Headers': '*'
        }
      }
    }
  },
  css: {
    postcss: './postcss.config.cjs'
  },
  base: '/', // 确保这里的基础路径配置正确
  resolve: {
    alias: {
      '@': '/src'  // 添加@别名
    }
  }
})
