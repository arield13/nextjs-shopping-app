module.exports = {
    env: {
      browser: true,
      es2021: true,
      jest: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:jsx-a11y/recommended',
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: [
      'react',
      'import',
      'jsx-a11y',
    ],
    rules: {
      'react/prop-types': 'off',
      'no-unused-vars': 'warn',
      'import/order': ['error', {
        'groups': [['builtin', 'external', 'internal']],
        'newlines-between': 'always'
      }],
      'jsx-a11y/anchor-is-valid': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };
  