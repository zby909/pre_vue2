const IS_PROD = ['production'].includes(process.env.VUE_APP_MODE);
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
let plugins = [];
// if (IS_PROD) {
//   plugins.push(
//     //gzip压缩gzip压缩gzip压缩
//     new CompressionWebpackPlugin({
//       filename: '[path].gz[query]',
//       algorithm: 'gzip',
//       test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
//       threshold: 10240,
//       minRatio: 0.8,
//       //删除原始文件只保留压缩后的文件
//       deleteOriginalAssets: true,
//     })
//   );
// }

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  productionSourceMap: IS_PROD ? false : true, //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  outputDir: process.env.outputDir, // 输出文件目录
  assetsDir: 'static',
  lintOnSave: 'default', //default,warning,error,boolean
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
    open: false, // 是否打开浏览器
    host: '0.0.0.0',
    port: '8080',
    proxy: {
      // '/kuyou': {
      //   target: 'http://hk-service.test.gzhaoku.com', // 要代理的域名
      //   changeOrigin: true, //允许跨域
      // },
      // '/ticket': {
      //   target: 'http://hk-service.test.gzhaoku.com', // 要代理的域名
      //   changeOrigin: true, //允许跨域
      // },
      '/': {
        // target: 'https://pmf.q2janus.com', // 要代理的域名
        target: 'https://zby909.top:3001/', // 要代理的域名
        changeOrigin: true, //允许跨域
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/styles/variables.scss";`,
      },
    },
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000, // 提取出的新chunk在两次压缩(打包压缩和服务器压缩)之前要大于30kb
        minChunks: 1, //当一个包至少被用了多少次的时候才进行代码分割 ，默认1
        maxAsyncRequests: 10,
        maxInitialRequests: 10,
        cacheGroups: {
          // 后续需要拆分的在最后加上
          default: {
            reuseExistingChunk: true, // 可设置是否重用已用chunk 不再创建新的chunk
            priority: 1, // 缓存组优先级
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 2,
          },
          vue: {
            name: 'vue',
            test: /[\\/]node_modules[\\/]vue[\\/]/,
            priority: 3,
          },
          vuex: {
            name: 'vuex',
            test: /[\\/]node_modules[\\/]vuex[\\/]/,
            priority: 4,
          },
          'vue-router': {
            name: 'vue-router',
            test: /[\\/]node_modules[\\/]vue-router[\\/]/,
            priority: 5,
          },
          vantUI: {
            name: 'chunk-vantui',
            test: /[\\/]node_modules[\\/]vant[\\/]/,
            priority: 6,
          },
        },
      },
    },

    plugins: plugins,
  },

  chainWebpack: config => {
    // config.module
    //   .rule('images')
    //   .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     mozjpeg: {
    //       progressive: true,
    //       quality: 80,
    //     },
    //     // optipng.enabled: false will disable optipng
    //     optipng: {
    //       enabled: false,
    //     },
    //     pngquant: {
    //       quality: [0.75, 0.9],
    //       speed: 4,
    //     },
    //     gifsicle: {
    //       //   optimizationLevel: 1,
    //       interlaced: false,
    //     },
    //   });

    config.plugin('html').tap(args => {
      args[0].title = 'zby';
      return args;
    });
  },
};
