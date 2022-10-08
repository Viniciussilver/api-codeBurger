module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["standard", "prettier"],
  plugins: ["prettier"],
  overrides: [],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
  rules: {
    camelcase: "off",
    "prettier/prettier": "error",
  },
}
//
