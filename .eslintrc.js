module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "arrow-parens": 0, //箭头函数用小括号括起来 - 关闭
    indent: [2, 2, { SwitchCase: 1 }], //缩进风格 - 开启缩进2格
    "no-control-regex": 0, //禁止在正则表达式中使用控制字符
    "no-useless-escape": 0, //禁用不必要的转义字符
  },
};
