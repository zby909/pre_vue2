# 本项目为 vue2 常用脚手架配置封装

# Technology stack

vuecli4_vant_axios
封装了 axios、字体库、路由、组件、vuex 等模块的自动引入
内置了自己常用的 js 工具,npm 库,小组件封装等

若用于 移动端 端项目：
因为使用了自动化转 vw 插件，因此设计稿默认为 750（可在 postcss.config.js 进行设置），已针对 vant 进行了 375 的适配。

若用于 pc 端项目：
手动卸载删除以下部分即可...

1. 移除对移动端适配安装的 postcss-px-to-viewport 插件相关
2. 移除 vant 相关（plugins-vant 以及相应的组件）

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve 运行本地代理development环境
```

### Compiles and minifies for production

```
npm run build:test 打包正测试test环境
npm run build:prod 打包正式production环境
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
