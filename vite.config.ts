/// <reference types="vitest" />

import Vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'

import AutoImportTypes from './src/plugins/autoImportType'
import vitestConfig from './vitestConfig'

// https://vitejs.dev/config/
export default defineConfig({
  test: vitestConfig,
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true
    }),
    AutoImportTypes({ dtsDir: 'src/types' }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'pinia',
        'vue-router',
        { '~/plugins/pinia-auto-refs': ['useStore'] },
        { '~/hooks': ['useVModel'] }
      ],
      dts: 'src/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: 'readonly' // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      dts: 'src/components.d.ts',
      dirs: ['src/components'], // 按需加载的文件夹
      resolvers: [ElementPlusResolver()]
    }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
    viteCompression({
      threshold: 1024000 // 对大于 1mb 的文件进行压缩
    })
  ],
  resolve: { alias: { '~': resolve(__dirname, 'src') } },
  server: {
    port: 3000,
    open: true, //自动打开
    base: './ ', //生产环境路径
    hmr: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://echarts.apache.org/examples',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  // 打包配置
  build: {
    target: 'modules', // 设置最终构建的浏览器兼容目标。modules:支持原生 ES 模块的浏览器
    outDir: 'dist', // 指定输出路径
    sourcemap: false, // 构建后是否生成 source map 文件
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    cssCodeSplit: true, // 启用/禁用 CSS 代码拆分
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }, // 去除 console debugger
    rollupOptions: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return id.toString().split('node_modules/')[1].split('/')[0].toString()
        }
      },
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    } // 将打包后的资源分开
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "~/assets/css/global.less";'
      }
    }
  }
})
