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
        target: 'http://192.168.3.22:8000',  // 确保这个地址是正确的
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          // 添加错误处理
          proxy.on('error', (err, req, res) => {
            console.log('proxy error', err)
          })
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Sending Request to the Target:', req.method, req.url)
          })
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url)
          })
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
