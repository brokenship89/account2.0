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
    // 网络连接错误
    if (!error.response) {
      return Promise.reject({
        message: '网络连接失败，请检查网络设置'
      })
    }

    // 处理后端返回的错误
    const errorData = error.response.data
    let errorMsg = '请求失败'

    // 根据不同的错误类型返回不同的提示
    switch (error.response.status) {
      case 400:
        // 处理验证错误
        if (errorData.phone) {
          // 手机号相关错误
          if (error.config.url.includes('send-code')) {
            if (errorData.phone.includes('already exists')) {
              errorMsg = '该手机号已被注册'
            } else {
              errorMsg = errorData.phone[0]
            }
          } else {
            errorMsg = errorData.phone[0]
          }
        } else if (errorData.password) {
          errorMsg = errorData.password[0] // 密码相关错误
        } else if (errorData.code) {
          errorMsg = errorData.code[0] // 验证码相关错误
        } else if (errorData.non_field_errors) {
          errorMsg = errorData.non_field_errors[0] // 通用错误
        } else if (errorData.error) {
          // 处理直接返回 error 字段的情况
          if (errorData.error.includes('验证码无效') || errorData.error.includes('已过期')) {
            errorMsg = '验证码无效或已过期'
          } else {
            errorMsg = errorData.error
          }
        } else {
          errorMsg = errorData.message || errorData.detail || '请求参数错误'
        }
        break
      case 401:
        errorMsg = '未登录或登录已过期'
        // 清除 token 并跳转到登录页
        if (!error.config.url.includes('logout')) {
          localStorage.removeItem('token')
          window.location.href = '/auth'
        }
        break
      case 403:
        errorMsg = '没有权限进行此操作'
        break
      case 404:
        errorMsg = '请求的资源不存在'
        break
      case 429:
        errorMsg = errorData.error || '请求过于频繁，请稍后再试'
        break
      default:
        errorMsg = errorData.message || errorData.detail || '服务器错误'
    }

    // 返回处理后的错误
    return Promise.reject({
      status: error.response.status,
      message: errorMsg,
      data: errorData
    })
  }
)

export default request 