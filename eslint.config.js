import { defineConfig } from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'
import typescriptParser from '@typescript-eslint/parser'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import prettierPlugin from 'eslint-plugin-prettier'

export default defineConfig([
  {
    ignores: [
      '.next/**',
      '.tanstack/**',
      'node_modules/**',
      'out/**',
      'build/**',
      'dist/**',
      'src/routeTree.gen.ts',
      'cloudflare-env.d.ts',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
      'semi-spacing': ['error', { after: true, before: false }],
      'semi-style': ['error', 'first'],
      'no-extra-semi': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: ['typeAlias', 'typeParameter'], format: ['PascalCase'] },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['no', 'is', 'has', 'should'],
          filter: { regex: '^_', match: false },
        },
      ],
      'prettier/prettier': 'error',
    },
  },
])
