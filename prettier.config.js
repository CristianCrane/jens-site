//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    "^react$",
    "^@tanstack/(.*)$",
    "^@mantine/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^@features/(.*)$",
    "^@/(.*)$",
    "^[./]"
  ],
  importOrderSortSpecifiers: true
}

export default config
