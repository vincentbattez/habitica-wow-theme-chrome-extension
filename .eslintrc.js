module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  "settings": {
    "import/resolver": {
      "typescript": {},
    },
  },
  extends: [
    'eslint:recommended',
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:promise/recommended',
  ],
  plugins: [
    "@typescript-eslint",
    "import",
    "no-loops",
  ],
  rules: {
    // Eslint rules: no-loop
    "no-loops/no-loops": 2,
    // Eslint rules: import
    "import/no-unresolved": "error",
    'import/named': 'error',
    'import/order': ['error', {
      groups: ['external', 'internal'],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
      pathGroups: [
        {
          pattern: '@components/**',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: '@services/**',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: '@shared/**',
          group: 'internal',
          position: 'after',
        },
      ],
    }],
    // Classic Eslint rules
    'object-curly-spacing': ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') ? 2 : 0,
    // profile overrides
    'func-names': ['error', 'as-needed'],
    // allow debugger during development
    // don't require .vue extension when importing
    'no-else-return': ['error', { allowElseIf: true }],
    'no-param-reassign': ['error', { props: false }],
    'no-underscore-dangle': 'off',
  },
}
