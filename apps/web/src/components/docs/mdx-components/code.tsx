import { cn } from '@/lib/utils'

export const code = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <code
      className={cn(
        'break-words [&:not(:has(.code-line))]:bg-input relative rounded px-[0.4rem] py-[0.04rem] [&:not(:has(.code-line))]:inline-block my-[0.2rem] font-mono text-sm',
        className
      )}
      {...props}
    />
  )
}
