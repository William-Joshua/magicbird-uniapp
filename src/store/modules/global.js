import { inject } from 'vue'

export const myStateKey = Symbol()

export default function createMyState() {
  const state = {
    /* ... */
  }
  return {
    install(app) {
      app.provide(myStateKey, state)
    }
  }
}

export function useMyState() {
  return inject(myStateKey)
}
