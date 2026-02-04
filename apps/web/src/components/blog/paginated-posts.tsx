import Balancer from 'react-wrap-balancer'

import type { LocaleOptions } from '@/lib/opendocs/types/i18n'
import type { Blog } from 'contentlayer/generated'

import { cn, formatDate, truncateText } from '@/lib/utils'
import { BlogPostItemTags } from './post-item-tags'
import { buttonVariants } from '../ui/button'
import { dateLocales } from '@/config/i18n'
import { Pagination } from './pagination'
import { RSSToggle } from './rss-toggle'
import { ReadTime } from './read-time'
import { Link } from '@/navigation'
import { Card } from '../ui/card'

interface PaginatedBlogPostsProps {
  posts: Blog[]
  locale: LocaleOptions
  totalPages: number
  currentPage: number
  currentTag?: string | null

  messages: {
    by: string
    next: string
    previous: string
    min_read: string
    rss_feed: string
    read_more: string
    go_to_next_page: string
    go_to_previous_page: string
  }
}

export function PaginatedBlogPosts({
  posts,
  locale,
  messages,
  totalPages,
  currentPage,
  currentTag,
}: PaginatedBlogPostsProps) {
  return (
    <main className="relative max-w-5xl mx-auto space-y-6 grid">
      <RSSToggle
        messages={{
          rss_feed: messages.rss_feed,
        }}
      />

      <div
        className={cn('grid gap-4 grid-cols-1', {
          'md:grid-cols-2': posts.length >= 2,
          'md:grid-cols-1': posts.length < 2,
        })}
      >
        {posts.map((post) => {
          const [_, ...slugList] = post.slugAsParams.split('/')
          const slug = slugList.join('/')

          const title = post.title
          const excerpt = post.excerpt

          return (
            <Card
              key={post._id}
              className="flex flex-col p-4 md:p-8 w-full h-full backdrop-blur-lg dark:bg-card-primary justify-between"
            >
              <div>
                <div className="flex items-center mb-2 text-xs text-muted-foreground justify-between gap-1">
                  <time dateTime={post.date}>
                    {formatDate(post.date, dateLocales[locale])}
                  </time>

                  <ReadTime
                    time={post.readTimeInMinutes}
                    variant="unstyled"
                    messages={{
                      min_read: messages.min_read,
                    }}
                  />
                </div>

                <Link
                  href={`/blog/${slug}`}
                  className={cn('hover:opacity-65 transition-all')}
                >
                  <h1 className="text-xl py-2">
                    <Balancer>{title}</Balancer>
                  </h1>
                </Link>

                <p className="text-muted-foreground">
                  <Balancer>{truncateText(excerpt, 148)}</Balancer>
                </p>
              </div>

              <BlogPostItemTags
                post={post}
                currentTag={currentTag}
              />

              <Link
                href={`/blog/${slug}`}
                className={cn(
                  'dark:hover:text-primary dark:text-primary-active transition-all',
                  buttonVariants({ variant: 'link' }),
                  'h-fit p-0 flex self-end mt-1'
                )}
              >
                {messages.read_more}
              </Link>
            </Card>
          )
        })}
      </div>

      {totalPages > 1 && (
        <Pagination
          locale={locale}
          currentPage={currentPage}
          numberOfPages={totalPages}
          currentTag={currentTag}
          messages={{
            next: messages.next,
            previous: messages.previous,
            go_to_next_page: messages.go_to_next_page,
            go_to_previous_page: messages.go_to_previous_page,
          }}
        />
      )}
    </main>
  )
}
