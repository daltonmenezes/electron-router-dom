import { getTranslations, setRequestLocale } from 'next-intl/server'
import { allDocs } from 'contentlayer/generated'

import type { LocaleOptions } from '@/lib/opendocs/types/i18n'
import type { Metadata } from 'next'

import '@/styles/mdx.css'

import { DashboardTableOfContents } from '@/components/docs/toc'
import { DocumentNotFound } from '@/components/docs/not-found'
import { getTableOfContents } from '@/lib/opendocs/utils/toc'
import { DocBreadcrumb } from '@/components/docs/breadcrumb'
import { getDocFromParams } from '@/lib/opendocs/utils/doc'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DocPageProps, DocParams } from '@/lib/opendocs/types/docs'
import { DocHeading } from '@/components/docs/heading'
import { DocsPager } from '@/components/docs/pager'
import { DocLinks } from '@/components/docs/links'
import { defaultLocale, locales } from '@/config/i18n'
import { Mdx } from '@/components/docs/mdx'
import { siteConfig } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

export const dynamicParams = false

export async function generateMetadata(props: DocPageProps): Promise<Metadata> {
  const params = await props.params
  const locale = params.locale

  setRequestLocale(locale || defaultLocale)

  const doc = await getDocFromParams({ params })

  if (!doc) {
    return {}
  }

  const [, ...docSlugList] = doc.slugAsParams.split('/')
  const docSlug = docSlugList.join('/') || ''

  return {
    title: doc.title,
    description: doc.description,

    openGraph: {
      type: 'article',
      title: doc.title,
      url: absoluteUrl(`/${locale}/docs/${docSlug}`),
      description: doc.description,

      images: [
        {
          ...siteConfig.og.size,
          url: siteConfig.og.image,
          alt: siteConfig.name,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: doc.title,
      description: doc.description,
      images: [siteConfig.og.image],
      creator: siteConfig.links.twitter.username,
    },
  }
}

export async function generateStaticParams(): Promise<DocParams[]> {
  const docs = allDocs.map((doc) => {
    const [locale, ...slugs] = doc.slugAsParams.split('/')

    return {
      slug: slugs,
      locale: locale as LocaleOptions,
    }
  })

  const indexParams = locales.map((locale) => ({
    slug: [],
    locale: locale as LocaleOptions,
  }))

  return [...docs, ...indexParams]
}

export default async function DocPage(props: DocPageProps) {
  const params = await props.params
  const locale = (params.locale || defaultLocale) as LocaleOptions
  setRequestLocale(locale)

  const doc = await getDocFromParams({ params: { ...params, locale } })
  const t = await getTranslations('docs')

  if (!doc) {
    return (
      <DocumentNotFound
        messages={{
          title: t('not_found.title'),
          description: t('not_found.description'),
        }}
      />
    )
  }

  const toc = await getTableOfContents(doc.body.raw)

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 lg:grid lg:grid-cols-[1fr_250px]">
      <div className="mx-auto w-full min-w-0">
        <DocBreadcrumb
          doc={doc}
          messages={{
            docs: t('docs'),
          }}
        />

        <DocHeading
          doc={doc}
          locale={locale}
        />

        <Mdx code={doc.body.code} />

        <div className="flex flex-col gap-6 lg:gap-8 pb-4 mt-16">
          <DocLinks doc={doc} />
          <DocsPager doc={doc} locale={locale} />
        </div>
      </div>

      <div className="hidden text-sm lg:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DashboardTableOfContents
            toc={toc}
            sourceFilePath={doc._raw.sourceFilePath}
            messages={{
              onThisPage: t('on_this_page'),
              editPageOnGitHub: t('edit_page_on_github'),
              startDiscussionOnGitHub: t('start_discussion_on_github'),
            }}
          />
        </div>
      </div>
    </main>
  )
}
