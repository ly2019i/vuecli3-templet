module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint",
  },
  parser: "vue-eslint-parser",
  // add your custom rules here
  rules: {
    semi: [2, "always"], //语句强制分号结尾
    quotes: 0,
    "space-before-function-paren": [0, "always"], //函数定义时括号前面要不要有空格
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    indent: ["off", 2], //缩进风格
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "handle-callback-err": 0, //nodejs 处理错误
    "arrow-parens": 0,
    eqeqeq: [0, "allow-null"], // 使用 === 替代 ==
    "no-unused-vars": [2, { vars: "all", args: "none" }], //不能有声明后未被使用的变量或参数
  },
};
