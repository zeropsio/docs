module.exports = {
  root: true,
  extends: ['docs/content'],
  rules: {
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'max-len': ['error', { code: 80, ignoreComments: true }]
  }
};
