import request from './request'

export const accountApi = {
  // 发送验证码
  sendCode: (phone, verifyType = 'register') => {
    const data = { phone, verify_type: verifyType }
    return request({
      url: 'accounts/send-code/',
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
        'X-Temp-Token': tempToken
      },
      data: {
        password: data.password,
        confirm_password: data.confirm_password
      }
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
  },

  // 获取用户资料
  getUserProfile: () => {
    return request({
      url: 'accounts/user/profile/',
      method: 'get'
    })
  },

  // 修改用户名
  updateUsername: (username) => {
    return request({
      url: 'accounts/user/profile/',
      method: 'put',
      data: { username }
    })
  },

  // 修改用户性别
  updateGender: (gender) => {
    return request({
      url: 'accounts/user/update-gender/',
      method: 'put',
      data: { gender }
    })
  },

  // 更新头像
  updateAvatar: (avatarFile) => {
    const formData = new FormData()
    formData.append('avatar', avatarFile)
    return request({
      url: 'accounts/user/avatar/',
      method: 'put',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
  }
} 