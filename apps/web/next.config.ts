import { createContentlayerPlugin } from 'next-contentlayer2'
import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withContentlayer = createContentlayerPlugin({})
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@repo/ui'],
}

export default withContentlayer(withNextIntl(nextConfig))
