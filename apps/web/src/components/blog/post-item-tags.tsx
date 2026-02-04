'use client'

import { useMemo } from 'react'

import type { Blog } from 'contentlayer/generated'

import { PaginationEllipsis } from '../ui/pagination'
import { Link } from '@/navigation'
import { Badge } from '../ui/badge'
import { getBlogPath } from '@/lib/opendocs/utils/blog'

export function BlogPostItemTags({
  post,
  currentTag,
  limitOfTagsToDisplay = 5,
}: {
  post: Blog
  currentTag?: string | null
  limitOfTagsToDisplay?: number
}) {
  const totalOfTags = post?.tags?.length || 0
  const shouldDisplayEllipsis = totalOfTags > limitOfTagsToDisplay

  const tags = useMemo(() => {
    if (!post?.tags) {
      return null
    }

    const tags = shouldDisplayEllipsis
      ? post.tags.slice(0, limitOfTagsToDisplay)
      : post.tags

    const uniqueTags = Array.from(new Set(tags))

    return uniqueTags
  }, [post?.tags, limitOfTagsToDisplay, shouldDisplayEllipsis])

  if (!tags) {
    return null
  }

  return (
    <div className="w-fit flex flex-wrap items-center gap-2 pt-4">
      {tags.map((tag) => {
        const isCurrentTagActive = tag === currentTag

        const href = isCurrentTagActive
          ? '/blog'
          : `/blog/tags/${tag}`

        return (
          <Link key={tag} href={href}>
            <Badge variant={isCurrentTagActive ? 'default' : 'secondary'}>
              {tag}
            </Badge>
          </Link>
        )
      })}

      {shouldDisplayEllipsis && (
        <Badge variant="secondary" className="pointer-events-none">
          <PaginationEllipsis className="w-fit h-full" />
        </Badge>
      )}
    </div>
  )
}
