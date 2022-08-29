const AutoImport = require("unplugin-auto-import/webpack") // 自动导入相关插件 api
const Components = require("unplugin-vue-components/webpack")
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers")
module.exports = {
  configureWebpack: {
    plugins: [
      AutoImport({
        imports: ["vue", "vue-router", "vuex"], // 自动导入vue和vue-router等相关函数
        eslintrc: {
          enabled: false, // 若没此json文件，先开启，生成后在关闭
          filepath: "./.eslintrc-auto-import.json", // 默认
          globalsPropValue: true,
        },
        resolvers: [ElementPlusResolver()],
        // dts: "src/auto-import.d.ts" // 生成 `auto-import.d.ts` 全局声明
      }),
      Components({
        dirs: ["src/components", "src/widgets"], // 扫描目录
        deep: true,
        resolvers: [ElementPlusResolver()], // 自动引入element-ui组件
      }),
    ],
  },
  devServer: {
    port: 8088,
    proxy: {
      "/": {
        target: "http://10.172.246.213:9997/", // 目标地址
        ws: false, // 是否代理websockets
        changeOrigin: true, // 设置同源 默认false，是否需要改变原始主机头为目标URL,
      },
    },
  },
  // 基本路径
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  lintOnSave: false,
}
