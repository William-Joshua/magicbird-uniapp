import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import appConfig from './src/config'

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  // 取得.env文件中的配置
  const port = 3080
  const proxyAPI = appConfig.devApi
  const proxyTarget = appConfig.devHost

  return defineConfig({
    // base: appConfig.ssrBase, // uniCloud 前端网页托管资源地址（主要是应用编译后的js，图片等静态资源，可以配置为二级目录）
    // 开发环境
    server: {
      port: port,
      cors: true,
      proxy: {
        // https://github.com/http-party/node-http-proxy#options
        [proxyAPI]: {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(proxyAPI, '')
        }
      }
    },
    plugins: [
      uni()
    ]
  })
}
