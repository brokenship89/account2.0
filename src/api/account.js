import request from './request'

export const accountApi = {
  // 发送验证码
  sendCode: (phone, verifyType = 'register') => {
    const data = { phone, verify_type: verifyType }
    console.log('发送验证码请求：', {
      url: 'accounts/send-code/',
      method: 'post',
      data
    })
    return request({
      url: 'accounts/send-code/',
      method: 'post',
      data
    })
  },

  // 验证验证码
  verifyPhone: (data) => {
    console.log('验证验证码请求参数：', data)
    return request({
      url: 'accounts/verify-phone/',
      method: 'post',
      data
    })
  },

  // 设置密码
  setPassword: (data, tempToken) => {
    return request({
      url: 'accounts/set-password/',
      method: 'post',
      headers: {
        'X-Temp-Token': tempToken,
        'Content-Type': 'application/json'
      },
      data
    })
  },

  // 用户登录
  login: (data) => {
    return request({
      url: 'accounts/login/',
      method: 'post',
      data
    })
  },

  // 修改密码
  changePassword: (data) => {
    return request({
      url: 'accounts/change-password/',
      method: 'post',
      data
    })
  },

  // 找回密码
  resetPassword: (data) => {
    return request({
      url: 'accounts/reset-password/',
      method: 'post',
      data
    })
  },

  // 用户登出
  logout: () => {
    return request({
      url: 'accounts/logout/',
      method: 'post'
    })
  },

  // 刷新token
  refreshToken: (data) => {
    return request({
      url: 'accounts/refresh-token/',
      method: 'post',
      data
    })
  }
} 