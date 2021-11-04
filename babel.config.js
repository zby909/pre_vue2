const IS_PROD = ['production', 'prod'].includes(process.env.VUE_APP_MODE);
const prodPlugins = [];

//remove console.log
if (IS_PROD) {
  prodPlugins.push('transform-remove-console');
}

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true,
      },
      'vant',
    ],
    // 发布产品时候的插件数组
    ...prodPlugins,
  ],
};
