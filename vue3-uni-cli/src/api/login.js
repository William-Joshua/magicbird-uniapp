import request from '/src/utils/request'

// 获取验证码
export function getCodeImg(params) {
  return request.get('/captcha/sms', { params })
}

// 登录方法
export function login(data) {
  return request.post('/login', data)
}

// 获取用户详细信息
export function getInfo() {
  return request.get('/getInfo')
}

// 退出方法
export function logout() {
  return request.post('/weblogout')
}
