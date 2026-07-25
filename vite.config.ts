import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { statsPlugin } from 'vite-bundle-explorer/plugin'
import tsconfigPaths from 'vite-tsconfig-paths'

const config = defineConfig({
  plugins: [
    devtools(),
    statsPlugin(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tanstackStart({
      // https://tanstack.com/start/latest/docs/framework/react/guide/import-protection#full-configuration-reference
      importProtection: {
        // always error, even in dev
        behavior: 'error',
        client: {
          // Block specific npm packages from the client bundle
          specifiers: ['**postgres**'],
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
