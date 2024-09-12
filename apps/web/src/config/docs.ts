/**
 * This file contains the configuration for the documentation
 * to be used by files like:
 * - src/components/command-menu.tsx
 * - src/components/mobile-nav.tsx
 * - src/app/[locale]/docs/layout.tsx
 * - src/lib/opendocs/components/docs/pager.tsx
 */

import type { DocsConfig } from '@/lib/opendocs/types/docs'
import { siteConfig } from './site'

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      href: '/docs',

      title: {
        en: 'Documentation',
        pt: 'Documentação',
      },
    },
  ],

  sidebarNav: [
    {
      title: {
        en: 'Getting Started',
        pt: 'Começando',
      },

      items: [
        {
          href: '/docs',

          title: {
            en: 'Introduction',
            pt: 'Introdução',
          },

          items: [],
        },

        {
          href: 'https://github.com/daltonmenezes/electron-router-dom/releases',
          external: true,

          title: {
            en: 'Changelog',
            pt: 'Histórico de alterações',
          },

          items: [],
        },
      ],
    },

    {
      title: {
        en: 'API',
      },

      items: [
        {
          title: {
            en: 'createElectronRouter',
          },

          href: '/docs/api/create-electron-router',

          items: [],
        },

        {
          title: {
            en: 'settings',
          },

          href: '/docs/api/settings',

          items: [],
        },

        {
          title: {
            en: 'main',
          },

          items: [
            {
              href: '/docs/api/main/register-route',

              title: {
                en: 'registerRoute',
              },

              items: [],
            },
          ],
        },

        {
          title: {
            en: 'renderer',
          },

          items: [
            {
              href: '/docs/api/renderer/router',

              title: {
                en: 'Router',
              },

              items: [],
            },
          ],
        },
      ],
    },

    {
      title: {
        en: 'Guides',
        pt: 'Guias',
      },

      items: [
        {
          href: '/docs/guides/typescript',

          title: {
            en: 'TypeScript',
          },

          items: [],
        },

        {
          href: '/docs/guides/context-api',

          title: {
            en: 'Context API',
          },

          items: [],
        },

        {
          href: '/docs/guides/troubleshooting',

          title: {
            en: 'Troubleshooting',
            pt: 'Resolução de problemas',
          },

          items: [],
        },

        {
          title: {
            en: 'Migration',
            pt: 'Migração',
          },

          items: [
            {
              href: '/docs/guides/migration/migrating-from-v1-to-v2',

              title: {
                en: 'Migrating from v1 to v2',
                pt: 'Migrando da v1 para a v2',
              },

              items: [],
            },
          ],
        },
      ],
    },

    {
      title: {
        en: 'Links',
      },

      items: [
        {
          title: {
            en: 'Examples',
            pt: 'Exemplos',
          },

          external: true,
          href: `${siteConfig.links.github.url}/tree/main/examples`,

          items: [],
        },
      ],
    },
  ],
} as const
