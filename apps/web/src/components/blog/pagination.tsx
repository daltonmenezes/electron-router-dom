'use client'

import { useMemo } from 'react'

import {
  PaginationItem,
  PaginationLink,
  PaginationContent,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  Pagination as RawPagination,
} from '@/components/ui/pagination'

import { cn } from '@/lib/utils'
import { getBlogPath } from '@/lib/opendocs/utils/blog'

interface PaginationProps {
  numberOfPages: number
  pagesToShow?: number
  currentPage: number
  currentTag?: string | null
  locale: string

  messages: {
    next: string
    previous: string
    go_to_next_page: string
    go_to_previous_page: string
  }
}

export function Pagination({
  messages,
  numberOfPages,
  currentPage,
  currentTag,
  locale,
  pagesToShow = 5,
}: PaginationProps) {
  const hasPreviousPage = currentPage > 1
  const hasNextPage = currentPage < numberOfPages

  const visiblePages = useMemo(() => {
    if (numberOfPages <= pagesToShow) {
      return Array.from({ length: numberOfPages }, (_, index) => index + 1)
    }

    const startPages = [1, 2]
    const endPages = [numberOfPages - 1, numberOfPages]

    const middlePages = [currentPage - 1, currentPage, currentPage + 1].filter(
      (page) => page > 2 && page < numberOfPages - 1
    )

    const allPages = [...startPages, ...middlePages, ...endPages]

    return [...new Set(allPages)]
  }, [currentPage, numberOfPages, pagesToShow])

  return (
    <RawPagination className="flex justify-center overflow-x-auto">
      <PaginationContent className="flex flex-wrap items-end space-x-2 space-y-2 sm:space-x-3 sm:space-y-0">
        <PaginationItem>
          <PaginationPrevious
            href={
              hasPreviousPage
                ? getBlogPath({ page: currentPage - 1, tag: currentTag, locale })
                : '#'
            }
            aria-label={messages.go_to_previous_page}
            className={cn({
              'opacity-50 pointer-events-none': !hasPreviousPage,
            })}
          >
            {messages.previous}
          </PaginationPrevious>
        </PaginationItem>

        {visiblePages.map((page, index) => {
          const isCurrentPage = page === currentPage

          const shouldDisplayEllipsis =
            index > 0 && page !== (visiblePages[index - 1] || 0) + 1

          return (
            <PaginationItem
              key={page}
              className={cn({
                'opacity-50 pointer-events-none': isCurrentPage,
              })}
            >
              {shouldDisplayEllipsis ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={getBlogPath({ page, tag: currentTag, locale })}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
            href={
              hasNextPage
                ? getBlogPath({ page: currentPage + 1, tag: currentTag, locale })
                : '#'
            }
            aria-label={messages.go_to_next_page}
            className={cn({
              'opacity-50 pointer-events-none': !hasNextPage,
            })}
          >
            {messages.next}
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </RawPagination>
  )
}
