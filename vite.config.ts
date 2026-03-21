import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'

const config = defineConfig({
  plugins: [
    devtools(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tanstackStart({
      // https://tanstack.com/start/latest/docs/framework/react/guide/import-protection#full-configuration-reference
      importProtection: {
        // always error, even in dev
        behavior: 'error',
        client: {
          // Block specific npm packages from the client bundle
          specifiers: [],
          // Block server files from client
          files: ['**/server/**'],
        },
        server: {
          // Block browser-only libraries from the server
          specifiers: [],
          // Block client files from server
          files: ['**/client/**'],
        },
      },
    }),
    viteReact(),
  ],
})

export default config
