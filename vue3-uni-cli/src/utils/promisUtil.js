// polyfill for finally，origin resp: https://github.com/youngjuning/wx-promise-pro

if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const P = this.constructor
    return this.then(
      value => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => { throw reason })
    )
  }
}

// core method
export const promisify = (api) => {
  return (args = {}) => {
    return new Promise((resolve, reject) => {
      api({
        fail: reject,
        success: resolve,
        ...args
      })
    })
  }
}

/**
 * 将某全局变量的方法变为异步
 * @param global 改全局变量
 * @param asyncMethods 改全局变量的方法数组
 */
export const promisifyAll = (global, asyncMethods) => {
  if (!global) {
    return
  }
  global.pro = {}
  Object.keys(global).forEach(key => {
    if (asyncMethods.indexOf(key) >= 0) {
      global.pro[key] = promisify(global[key])
    } else if (key !== 'createSignal' && key !== 'lanDebug') {
      global.pro[key] = global[key]
    }
  })
}
