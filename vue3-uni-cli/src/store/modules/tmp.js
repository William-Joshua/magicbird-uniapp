import { uselocalStore } from '/src/utils/localstore'
import { createGlobalState } from '@vueuse/shared'

const LIFECONF_KEY = 'tmpData'

const initVal = {
  searchHistory: []
}

export const useTmpGlobal = createGlobalState(
  () => uselocalStore(LIFECONF_KEY, initVal)
)
