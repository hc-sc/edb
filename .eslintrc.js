module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
    "jasmine": true
  },
  "extends": [
    "eslint:recommended",
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module"
  },
  "plugins": [
    "html",
  ],
  "rules": {
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "indent": [
      "error",
      2,
      {"SwitchCase": 1}
    ],
    "quotes": [
      "error",
      "single",
      {"allowTemplateLiterals": true}
    ],
    "semi": [
      "error",
      "always"
    ]
  }
}
