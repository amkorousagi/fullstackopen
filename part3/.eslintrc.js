//3-22
module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true
    },
    "plugins": ["prettier"],
    'extends': ["eslint:recommended", "plugin:prettier/recommended", "airbnb"],
    'parserOptions': {
        'ecmaVersion': 12
    },
    'rules': {
        "prettier/prettier": "error"
    }
}
