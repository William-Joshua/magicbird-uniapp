import roleDirective from './modules/hasRole'
import permiDirective from './modules/hasPermi'
import { hasRole } from './modules/hasRole'
import { hasPermi } from './modules/hasPermi'

export function setupDirectives(app) {
  app.directive('hasRole', roleDirective)
  app.directive('hasPermi', permiDirective)
  app.config.globalProperties.$hasRole = hasRole
  app.config.globalProperties.$message = hasPermi
  uni.hasRole = hasRole
  uni.hasPermi = hasPermi
}
