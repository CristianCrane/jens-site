//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    rules: {
      'import/no-cycle': 'off',
      'import/order': 'off',
      'sort-imports': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'off',
      'pnpm/json-enforce-catalog': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@features/*/*', '#features/*/*'],
              message:
                'Use the public API by importing from @features/feature-name instead of deep-linking into subfolders.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/*/client/**/*', 'src/features/*/server/**/*'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  {
    ignores: ['eslint.config.js', 'prettier.config.js'],
  },
]
