module.exports = {
    root: true,
    env: {
      es6: true,
      node: true,
      browser: true,
      jest: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
      sourceType: "module",
      ecmaVersion: 12,
      tsconfigRootDir: __dirname,
      project: "./tsconfig.eslint.json",
    },
    // extendsから利用するためコメントアウト
    plugins: ['react', '@typescript-eslint', 'prettier'],
    settings: {
      react: {
        version: "detect",
      },
    },
    // 以前のものから流用
    rules: {
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],
      '@typescript-eslint/no-unused-vars': 'error',
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
      'import/extensions': [
        'error',
        { extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'] },
      ],
      'react/prop-types': 'off',
      'spaced-comment': ['error', 'always', { markers: ['/ <reference'] }],
      'prettier/prettier': 'error',
    },
    extends: [
      // "eslint:recommended",
      // // 'plugin:@typescript-eslint/eslint-recommended',
      // // eslint:recommendedに含まれるルールを型チェックでカバーできるものは無効化とあったが公式に言及見当たらず
      // "plugin:@typescript-eslint/recommended",
      // "plugin:@typescript-eslint/recommended-requiring-type-checking",
      // "plugin:react/recommended",
      // "prettier",
      'plugin:react/recommended',
      'airbnb',
      'plugin:prettier/recommended',
    ],
    ignorePatterns: [
      ".eslintrc.js",
      "webpack.common.js",
      "webpack.prod.js",
      "webpack.dev.js",
      "babel.config.js",
    ],
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  };