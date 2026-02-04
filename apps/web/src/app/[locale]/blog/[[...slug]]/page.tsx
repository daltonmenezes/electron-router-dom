import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { compareDesc } from 'date-fns'

import type { LocaleOptions } from '@/lib/opendocs/types/i18n'
import type { Metadata } from 'next'

import '@/styles/mdx.css'

import { PaginatedBlogPosts } from '@/components/blog/paginated-posts'
import { BlogPostBreadcrumb } from '@/components/blog/breadcrumb'
import { DashboardTableOfContents } from '@/components/docs/toc'
import { getTableOfContents } from '@/lib/opendocs/utils/toc'
import { getBlogFromParams } from '@/lib/opendocs/utils/blog'
import { BlogPostHeading } from '@/components/blog/heading'
import { BlogPostTags } from '@/components/blog/post-tags'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AuthorCard } from '@/components/blog/author'
import { allBlogs } from 'contentlayer/generated'
import { defaultLocale, locales } from '@/config/i18n'
import { Mdx } from '@/components/docs/mdx'
import { siteConfig } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

interface BlogParams {
  slug: string[]
  locale: string
}

interface BlogPageProps {
  params: Promise<BlogParams>
}

export const dynamicParams = false

const POSTS_PER_PAGE = 6

function getParamsFromSlug(slug: string[] = []) {
  if (slug.length === 0) {
    return { page: 1, tag: null, isPost: false }
  }

  if (slug.length === 2 && slug[0] === 'page') {
    const page = parseInt(slug[1]!)
    return { page: isNaN(page) ? 1 : page, tag: null, isPost: false }
  }

  if (slug.length >= 2 && slug[0] === 'tags') {
    const tag = decodeURI(slug[1]!)
    if (slug.length === 2) {
      return { page: 1, tag, isPost: false }
    }
    if (slug.length === 4 && slug[2] === 'page') {
      const page = parseInt(slug[3]!)
      return { page: isNaN(page) ? 1 : page, tag, isPost: false }
    }
  }

  return { page: 1, tag: null, isPost: true }
}

export async function generateMetadata(props: BlogPageProps): Promise<Metadata> {
  const params = await props.params
  const locale = (params.locale || defaultLocale) as LocaleOptions

  setRequestLocale(locale)

  const [t, blogPost] = await Promise.all([
    getTranslations('site'),
    getBlogFromParams({ params: { ...params, locale } }),
  ])

  if (!blogPost) {
    const title = t('words.blog')
    const description = t('description')

    const tags = new Set(
      allBlogs
        .map((blog) => blog.tags)
        .flat()
        .filter(Boolean)
    )

    const ogImage = absoluteUrl(`/og.jpg`)

    return {
      title,
      description,
      keywords: Array.from(tags),

      openGraph: {
        title,
        description,
        type: 'website',
        url: absoluteUrl(`/${locale}/blog`),

        images: [
          {
            ...siteConfig.og.size,
            url: ogImage,
            alt: siteConfig.name,
          },
        ],
      },

      twitter: {
        title,
        description,
        images: [ogImage],
        card: 'summary_large_image',
        creator: siteConfig.links.twitter.username,
      },
    }
  }

  const [, ...blogSlugList] = blogPost.slugAsParams.split('/')
  const blogSlug = blogSlugList.join('/') || ''

  const postAuthorName = blogPost.author?.name || siteConfig.author.name
  const postAuthorUrl = blogPost.author?.site || siteConfig.author.site

  const postAuthorTwitter =
    blogPost.author?.social?.twitter || siteConfig.links.twitter.username

  const postOgImage = blogPost.og_image
    ? absoluteUrl(`/blog-og/${blogPost.og_image}`)
    : absoluteUrl(`/${locale}/blog/og/${blogSlug}`)

  return {
    title: blogPost.title,
    description: blogPost.excerpt,
    keywords: blogPost.tags || [],

    authors: {
      url: postAuthorUrl,
      name: postAuthorName,
    },

    openGraph: {
      type: 'article',
      title: blogPost.title,
      authors: postAuthorName,
      description: blogPost.excerpt,
      url: absoluteUrl(`/${locale}/blog/${blogSlug}`),

      images: [
        {
          ...siteConfig.og.size,
          url: postOgImage,
          alt: blogPost.title,
        },
      ],
    },

    twitter: {
      title: blogPost.title,
      images: [postOgImage],
      creator: postAuthorTwitter,
      card: 'summary_large_image',
      description: blogPost.excerpt,
    },
  }
}

export async function generateStaticParams(): Promise<BlogParams[]> {
  const posts = allBlogs
  const tags = new Set(posts.map((p) => p.tags).flat().filter(Boolean))

  // 1. Post pages
  const postParams = posts.map((blog) => {
    const [locale, ...slugs] = blog.slugAsParams.split('/')
    return { slug: slugs, locale: locale as LocaleOptions }
  })

  // 2. Index pagination pages
  const indexParams: BlogParams[] = []
  
  for (const locale of locales) {
    // Filter posts for this locale to calculate correct pagination
    const localePosts = posts.filter(p => {
       const [l] = p.slugAsParams.split('/')
       return l === locale
    })
    
    const totalPages = Math.ceil(localePosts.length / POSTS_PER_PAGE) || 1

    // Page 1 is []
    indexParams.push({ slug: [], locale: locale as LocaleOptions })
    
    // Pages 2..N
    for (let i = 2; i <= totalPages; i++) {
      indexParams.push({ slug: ['page', i.toString()], locale: locale as LocaleOptions })
    }
  }

  // 3. Tag pages and their pagination
  const tagParams: BlogParams[] = []
  
  for (const tag of Array.from(tags)) {
    if (!tag) continue;
    
    for (const locale of locales) {
      // Filter posts for this locale AND tag
      const localeTagPosts = posts.filter(p => {
         const [l] = p.slugAsParams.split('/')
         return l === locale && p.tags?.includes(tag)
      })
      
      if (localeTagPosts.length === 0) {
         // Even if tag exists globally, if no posts in this locale have it, we might skip or include empty?
         // Better to include it if we want to show empty state, or skip.
         // Let's assume we want to show it (maybe with 0 posts).
         // But usually we skip.
         // Let's only generate if there are posts or at least 1 page.
      }

      const totalTagPages = Math.ceil(localeTagPosts.length / POSTS_PER_PAGE) || 1

      // Tag Page 1
      tagParams.push({ slug: ['tags', tag], locale: locale as LocaleOptions })
      
      // Tag Pages 2..N
      for (let i = 2; i <= totalTagPages; i++) {
        tagParams.push({ slug: ['tags', tag, 'page', i.toString()], locale: locale as LocaleOptions })
      }
    }
  }

  return [...postParams, ...indexParams, ...tagParams]
}

export default async function BlogPage(props: BlogPageProps) {
  const params = await props.params
  const locale = (params.locale || defaultLocale) as LocaleOptions

  setRequestLocale(locale)

  const { slug } = params
  const { page, tag, isPost } = getParamsFromSlug(slug)

  if (isPost) {
    const t = await getTranslations()
    const blogPost = await getBlogFromParams({ params: { ...params, locale } })

    if (!blogPost) {
      return notFound()
    }

    const toc = await getTableOfContents(blogPost.body.raw)

    return (
      <div className="container relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px] pb-12">
        <div className="mx-auto w-full min-w-0">
          <BlogPostBreadcrumb
            post={blogPost}
            messages={{
              posts: t('site.words.blog'),
            }}
          />

          <BlogPostHeading
            post={{ ...blogPost, notAvailable: false }}
            locale={locale}
            messages={{
              by: t('blog.words.by'),
              min_read: t('blog.cards.min_read'),
            }}
          />

          <div className="mt-8 flex flex-wrap gap-2 lg:mt-0">
            <BlogPostTags post={blogPost} />
          </div>

          <div className="mt-8">
            <ScrollArea className="h-full max-h-[500px] w-full pb-8 lg:hidden">
              <DashboardTableOfContents
                toc={toc}
                sourceFilePath={blogPost._raw.sourceFilePath}
                messages={{
                  onThisPage: t('docs.on_this_page'),
                  editPageOnGitHub: t('docs.edit_page_on_github'),
                  startDiscussionOnGitHub: t('docs.start_discussion_on_github'),
                }}
              />
            </ScrollArea>

            <Mdx code={blogPost.body.code} />

            <div className="mt-8 flex flex-col justify-between lg:flex-row lg:items-center">
              <AuthorCard post={blogPost} />
            </div>
          </div>
        </div>

        <div className="hidden text-sm xl:block">
          <div className="sticky top-20 h-[calc(100vh-3.5rem)] overflow-hidden pt-4">
            <ScrollArea className="h-full pb-10">
              <DashboardTableOfContents
                toc={toc}
                sourceFilePath={blogPost._raw.sourceFilePath}
                messages={{
                  onThisPage: t('docs.on_this_page'),
                  editPageOnGitHub: t('docs.edit_page_on_github'),
                  startDiscussionOnGitHub: t('docs.start_discussion_on_github'),
                }}
              />
            </ScrollArea>
          </div>
        </div>
      </div>
    )
  }

  // List View
  const t = await getTranslations()
  
  let posts = allBlogs
    .filter((post) => {
      const [postLocale] = post.slugAsParams.split('/')
      return postLocale === locale
    })
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  if (tag) {
    posts = posts.filter((post) => post.tags?.includes(tag))
  }
  
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE) || 1
  
  // Validate page number
  if (page > totalPages && posts.length > 0) {
     return notFound()
  }
  
  const paginatedPosts = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

          return (
            <PaginatedBlogPosts
              posts={paginatedPosts}
              locale={locale}
              totalPages={totalPages}
              currentPage={page}
              currentTag={tag}
              messages={{
                by: t('blog.words.by'),
                next: t('blog.buttons.next'),
                min_read: t('blog.cards.min_read'),
                previous: t('blog.buttons.previous'),
                rss_feed: t('blog.buttons.rss_feed'),
                read_more: t('blog.buttons.read_more'),
                go_to_next_page: t('blog.buttons.go_to_next_page'),
                go_to_previous_page: t('blog.buttons.go_to_previous_page'),
              }}
            />
          )
        }
