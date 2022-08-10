import useUserStore from '/src/store/modules/user'

/**
 * 角色权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function hasRole(value) {
  const { getUser } = useUserStore()
  const roles = getUser()?.roles || []

  if (value && value instanceof Array && value.length > 0) {
    const super_admin = 'admin'
    const permissionRoles = value

    return roles.some(role => {
      return super_admin === role || permissionRoles.includes(role)
    })
  } else {
    console.error(`need roles! Like checkRole="['admin','editor']"`)
    return false
  }
}

export default {
  mounted(el, binding, vnode) {
    const { value } = binding

    if (!hasRole(value)) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
