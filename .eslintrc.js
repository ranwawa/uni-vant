module.exports = {
  extends: ["@vue/airbnb", "plugin:vue/essential"],
  globals: {
    ap: true,
    my: true,
    uni: true,
    getCurrentPages: true,
    vconsole: true,
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    arguments: true,
    require: true
  },
  parserOptions: {
    // "ecmaVersion": 2018,
    // "sourceType": "module"
    parser: "babel-eslint"
  },
  plugins: ["vue"],
  rules: {
    "import/no-extraneous-dependencies": 0,
    "no-console": "off",
    "no-unused-vars": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "import/no-unresolved": 0,
    "no-param-reassign": 0,
    "no-unused-expressions": 0
  },
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  }
};
