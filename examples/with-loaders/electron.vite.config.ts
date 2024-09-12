import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import tsconfigPathsPlugin from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import { resolve } from 'path'

import { settings } from './src/lib/electron-router-dom'

const tsconfigPaths = tsconfigPathsPlugin({
  projects: [resolve('tsconfig.json')],
})

export default defineConfig({
  main: {
    plugins: [tsconfigPaths, externalizeDepsPlugin()],
  },

  renderer: {
    plugins: [tsconfigPaths, react()],

    css: {
      postcss: {
        plugins: [
          tailwindcss({
            config: './tailwind.config.ts',
          }),
        ],
      },
    },

    server: {
      port: settings.port,
    },
  },
})
