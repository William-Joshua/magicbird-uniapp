import useUserStore from '/src/store/modules/user'

/**
 * 字符权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function hasPermi(value) {
  const { getUser } = useUserStore()
  const permissions = getUser()?.permissions || []

  if (value && value instanceof Array && value.length > 0) {
    const all_permission = '*:*:*'
    const permissionDatas = value

    return permissions.some(permission => {
      return all_permission === permission || permissionDatas.includes(permission)
    })
  } else {
    console.error(`need roles! Like checkPermi="['system:user:add','system:user:edit']"`)
    return false
  }
}

export default {
  mounted(el, binding, vnode) {
    const { value } = binding

    if (!hasPermi(value)) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
