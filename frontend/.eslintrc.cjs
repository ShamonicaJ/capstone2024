module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended', // Add this line for React Hooks
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-hooks'], // Add 'react-hooks' as a plugin
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-hooks/rules-of-hooks': 'error', // Add this rule for React Hooks
    'react-hooks/exhaustive-deps': 'warn', // Add this rule for React Hooks
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};

