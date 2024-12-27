import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import vue from '@vitejs/plugin-vue'

//elementPlus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import postCssPxToRem  from "postcss-pxtorem";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       javascriptEnabled: true,
  //       additionalData: '@import "./src/styles/variable.scss";'
  //     }
  //   },
  //   postcss: {
  //     plugins: [
  //       postCssPxToRem({
  //         // 自适应
  //         rootValue({ file }) {
  //           return file.indexOf('vant') !== -1 ? 30 : 130
  //         },
  //         propList: ['*']
  //       })
  //     ]
  //   }
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
