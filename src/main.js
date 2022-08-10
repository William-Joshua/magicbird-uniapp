import { createSSRApp } from 'vue'

import App from './App.vue'
import store from './store'
// import router from './router'
import { setupDirectives } from './directives'
import { registerGlobComp } from './components/registerGlobComp'

export function createApp() {
  const app = createSSRApp(App)

  app.use(store)
  // app.use(router)

  setupDirectives(app)
  registerGlobComp(app)

  return {
    app
  }
}
