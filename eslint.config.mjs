import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    // Правила для основних файлів проєкту (.js)
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 'latest',
      sourceType: 'commonjs', // Тут залишаємо commonjs для твого коду
    },
    rules: {
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-console': 'off'
    }
  },
  {
    // Окреме правило для файлів конфігурації (.mjs)
    files: ['**/*.mjs'],
    languageOptions: {
      sourceType: 'module' // Вказуємо, що тут використовуються імпорти
    }
  }
];