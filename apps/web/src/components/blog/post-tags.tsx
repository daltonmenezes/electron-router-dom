import type { Blog } from 'contentlayer/generated'

import { badgeVariants } from '../ui/badge'
import { Link } from '@/navigation'
import { cn } from '@/lib/utils'

import { getBlogPath } from '@/lib/opendocs/utils/blog'

export async function BlogPostTags({ post }: { post: Blog }) {
  if (!post.tags) {
    return null
  }

  const [locale] = post.slugAsParams.split('/')

  return (
    <div className="flex flex-wrap gap-1 md:gap-2 items-center mt-6 mb-10">
      {post.tags.map((tag) => (
        <Link
          key={tag}
          href={getBlogPath({ tag, locale })}
          className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}
