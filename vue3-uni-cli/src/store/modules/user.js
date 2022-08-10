import { uselocalStore } from '/src/utils/localstore'
import { createGlobalState } from '@vueuse/shared'
import { computed } from 'vue'
import { forceLogin, toLogin } from '/src/utils'

const LIFEDATA_KEY = 'lifeData'

const initVal = {
  token: '',
  user: {
    nickName: '游客'
  }
}

export const useUserGlobal = createGlobalState(
  () => uselocalStore(LIFEDATA_KEY, initVal)
)

export default function useUserStore() {
  const lifeData = useUserGlobal()

  const getToken = () => {
    return lifeData.value.token
  }

  const getUser = () => {
    return lifeData.value.user
  }

  const vuex_token = computed(() => {
    return lifeData.value.token
  })

  const vuex_user = computed(() => {
    return lifeData.value.user
  })

  const initUserStore = () => {
    lifeData.value.token = ''
    lifeData.value.user = { nickName: '游客' }
  }

  const autoLogin = () => {
    // 页面出栈
    forceLogin(getToken())
  }

  const clickLogin = () => {
    // 页面不出栈
    toLogin()
  }

  return {
    lifeData,
    getToken,
    getUser,
    vuex_token,
    vuex_user,
    initUserStore,
    autoLogin,
    clickLogin
  }
}
