module.exports = {
  "env": {
    "browser": true
    ,"commonjs": true
    ,"es6": true
    ,"node": true
    ,"mocha": true
    ,"protractor": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "semi": [1, "always"]
    ,"indent": [1, 2]
    // ,"linebreak-style": [1, "unix"]
    ,"quotes": [1, "single"]
    ,"no-console": 1
    ,"no-unused-vars": 1
    ,"no-debugger": 1
    ,"brace-style": [1, "stroustrup"]
  }
}