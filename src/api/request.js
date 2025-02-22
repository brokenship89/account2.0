import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      // 确保 token 格式正确
      config.headers['Authorization'] = token.startsWith('Token ') ? token : `Token ${token}`
      console.log('发送请求的 token：', config.headers['Authorization'])
    } else {
      console.log('没有找到 token')
    }
    console.log('完整请求配置：', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    console.log('完整响应数据：', response)
    return response.data
  },
  error => {
    if (error.response) {
      console.log('错误响应：', error.response)
      // token 过期或无效
      if (error.response.status === 401 && !error.config.url.includes('logout')) {
        // 只有在非登出请求时才自动清除 token 并跳转
        localStorage.removeItem('token')
        window.location.href = '/auth'
      }
      // 其他错误处理
      const errorData = error.response.data
      const errorMsg = errorData.non_field_errors?.[0] || 
                      errorData.message || 
                      errorData.error || 
                      errorData.detail ||  // 添加对 detail 字段的处理
                      '请求失败'
      console.error('错误详情：', errorData)
      error.message = errorMsg
    }
    return Promise.reject(error)
  }
)

export default request 