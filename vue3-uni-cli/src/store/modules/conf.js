import { uselocalStore } from '/src/utils/localstore'
import { createGlobalState } from '@vueuse/shared'

const LIFECONF_KEY = 'lifeConf'

export const initConfVal = {}

export const useConfGlobal = createGlobalState(
  () => uselocalStore(LIFECONF_KEY, initConfVal)
)
