module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
    'node':true
  },
  'extends': 'eslint:recommended',
  'overrides': [
  ],
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 'latest'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'windows'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
