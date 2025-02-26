import { getTranslations, setRequestLocale } from 'next-intl/server'
import dynamic from 'next/dynamic'

import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { Announcement } from '@/components/announcement'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { siteConfig } from '@/config/site'
import { Link } from '@/navigation'
import { cn } from '@/lib/utils'

import {
  PageHeader,
  PageActions,
  PageHeaderHeading,
  PageHeaderDescription,
} from '@/components/page-header'

import type { LocaleOptions } from '@/lib/opendocs/types/i18n'

import { InstallationBox } from '@/components/installation-box'

export const dynamicParams = true

const Vortex = dynamic(() => import('../../components/ui/vortex'), {
  ssr: false,
})

export default async function IndexPage({
  params,
}: {
  params: { locale: LocaleOptions }
}) {
  setRequestLocale(params.locale)

  const t = await getTranslations()

  return (
    <div className="container relative">
      <PageHeader className="md:mt-14">
        <Announcement
          title={t('site.announcement')}
          href="/blog/introducing-v2"
        />

        <PageHeaderHeading className="dark:title title !text-7xl">
          {t('site.heading')}
        </PageHeaderHeading>

        <PageHeaderDescription>
          <TextGenerateEffect words={t('site.description')} />
        </PageHeaderDescription>

        <PageActions>
          <Link href="/docs" className={cn(buttonVariants())}>
            {t('site.buttons.get_started')}
          </Link>

          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github.url}
            title={siteConfig.links.github.label}
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            <Icons.gitHub className="mr-2 size-4" />
            {siteConfig.links.github.label}
          </Link>
        </PageActions>

        <div className="fixed left-0 -top-40 size-full -z-10 overflow-hidden">
          <Vortex
            backgroundColor="transparent"
            className="flex size-full"
            rangeY={300}
            baseRadius={2}
            particleCount={20}
            rangeSpeed={1.5}
            baseHue={50}
          />
        </div>

        <section className="relative flex">
          <InstallationBox
            theme="Theme"
            className="w-full relative max-w-[32rem] flex flex-wrap items-center pl-4 pr-12"
            __bunCommand__="bun install electron-router-dom"
            __yarnCommand__="yarn add electron-router-dom"
            __pnpmCommand__="pnpm install electron-router-dom"
            __npmCommand__="npm install electron-router-dom"
            __rawString__="npm i electron-router-dom"
          />
        </section>
      </PageHeader>
    </div>
  )
}
