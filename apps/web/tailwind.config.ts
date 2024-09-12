import type { Config } from 'tailwindcss'

import sharedConfig from '@repo/ui/tailwind.config'

const config = {
  ...sharedConfig,

  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/opendocs/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../content/**/*.mdx',
  ],
} satisfies Config

export default config
