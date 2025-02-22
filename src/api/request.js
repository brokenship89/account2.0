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
    
    // 只有需要认证的接口才添加 token
    if (token && !config.url.includes('send-code')) {
      config.headers['Authorization'] = token.startsWith('Token ') ? token : `Token ${token}`
    }

    // 更清晰的请求日志
    console.log('发送请求：', {
      url: config.url,
      method: config.method,
      data: config.data,
      needAuth: !config.url.includes('send-code') // 标记是否需要认证
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
    // 更清晰的响应日志
    console.log('请求成功：', {
      url: response.config.url,
      method: response.config.method,
      status: response.status,
      data: response.data,
      message: response.data.message || '请求成功'
    })
    return response.data
  },
  error => {
    // 添加连接错误处理
    if (!error.response) {
      console.error('网络连接错误：', error)
      error.message = '网络连接失败，请检查网络设置'
      return Promise.reject(error)
    }

    if (error.response) {
      // 更清晰的错误日志
      console.error('请求失败：', {
        url: error.config.url,
        method: error.config.method,
        status: error.response.status,
        error: error.response.data.error || error.response.data.message || '未知错误',
        details: error.response.data
      })
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