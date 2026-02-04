import { type Blog, allBlogs } from 'contentlayer/generated'

import type { BlogParams } from '../types/blog'

import { defaultLocale } from '@/config/i18n'

export function makeLocalizedSlug({ locale, slug }: BlogParams) {
  const _slug = slug?.join('/')
  const _locale = locale || defaultLocale

  const localizedSlug = [_locale, _slug].filter(Boolean).join('/')

  return localizedSlug
}

export async function getBlogFromParams({
  params,
}: { params: BlogParams }): Promise<(Blog & { notAvailable: boolean }) | null> {
  let localizedSlug = makeLocalizedSlug(params)
  let blog = allBlogs.find((blog) => blog.slugAsParams === localizedSlug)

  if (!blog) {
    localizedSlug = makeLocalizedSlug({
      ...params,
      locale: defaultLocale,
    })

    blog = allBlogs.find((blog) => blog.slugAsParams === localizedSlug)

    return blog ? { ...blog, notAvailable: true } : null
  }

  return { ...blog, notAvailable: false }
}

export function getBlogPath({
  page,
  tag,
}: {
  page?: number
  tag?: string | null
  locale?: string
}) {
  const parts = ['/blog']

  if (tag) {
    parts.push('tags', tag)
  }

  if (page && page > 1) {
    parts.push('page', page.toString())
  }

  return parts.join('/')
}
