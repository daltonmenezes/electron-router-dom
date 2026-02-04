import type { Config } from 'tailwindcss'

import sharedConfig from '@repo/ui/tailwind.config'

const config = {
  ...sharedConfig,

  theme: {
    ...sharedConfig.theme,

    extend: {
      ...sharedConfig.theme?.extend,

      fontFamily: {
        geist: ['Geist', 'sans-serif'],
      },
    },
  },

  content: [
    './src/renderer/**/*.{ts,tsx}',
    './src/renderer/screens/**/*.{ts,tsx}',
    './src/renderer/components/**/*.{ts,tsx}',
  ],
} satisfies Config

export default config
