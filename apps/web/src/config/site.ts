import { absoluteUrl } from '@/lib/utils'
import en from '@/i18n/locales/en.json'
import pt from '@/i18n/locales/pt.json'

import json from '../../../../packages/electron-router-dom/package.json'

export const siteConfig = {
  name: 'Electron Router DOM',

  description: {
    en: en.site.description,
    pt: pt.site.description,
  },

  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

  og: {
    image: absoluteUrl('/og.jpg'),

    size: {
      width: 1200,
      height: 630,
    },
  },

  app: {
    latestVersion: json.version,
  },

  author: {
    name: 'Dalton Menezes',
    site: 'https://daltonmenezes.com',
  },

  links: {
    twitter: {
      label: 'Twitter',
      username: '@daltonmenezes',
      url: 'https://twitter.com/daltonmenezes',
    },

    github: {
      label: 'GitHub',
      url: 'https://github.com/daltonmenezes/electron-router-dom',
    },
  },
} as const

export type SiteConfig = typeof siteConfig
