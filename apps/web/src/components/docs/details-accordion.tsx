'use client'

import * as React from 'react'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'

type AccordionType = 'single' | 'multiple'

interface AccordionContextValue {
  type: AccordionType
  value: string | string[] | undefined
  onValueChange: (value: string) => void
  collapsible?: boolean
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

interface AccordionItemContextValue {
  value: string
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null)

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AccordionType
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: any) => void
  collapsible?: boolean
}

export function Accordion({
  type = 'single',
  defaultValue,
  value: controlledValue,
  onValueChange,
  collapsible = false,
  children,
  className,
  ...props
}: AccordionProps) {
  
  const [internalValue, setInternalValue] = React.useState<string | string[] | undefined>(
    defaultValue || (type === 'multiple' ? [] : undefined)
  )

  const value = controlledValue !== undefined ? controlledValue : internalValue

  const handleValueChange = (itemValue: string) => {
    let newValue: string | string[] | undefined = value

    if (type === 'single') {
      if (value === itemValue) {
         if (collapsible) {
             newValue = ''
         }
      } else {
        newValue = itemValue
      }
    } else {
      const current = Array.isArray(value) ? value : []
      if (current.includes(itemValue)) {
        newValue = current.filter(v => v !== itemValue)
      } else {
        newValue = [...current, itemValue]
      }
    }

    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <AccordionContext.Provider value={{ type, value, onValueChange: handleValueChange, collapsible }}>
      <div className={className} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDetailsElement> {
  value: string
}

export function AccordionItem({
  value,
  children,
  className,
  ...props
}: AccordionItemProps) {
  const context = React.useContext(AccordionContext)
  
  let isOpen = false
  if (context) {
     if (context.type === 'single') {
       isOpen = context.value === value
     } else {
       isOpen = Array.isArray(context.value) && context.value?.includes(value)
     }
  }

  return (
    <AccordionItemContext.Provider value={{ value }}>
      <details
        className={cn("group border-b", className)}
        open={isOpen}
        {...props}
      >
        {children}
      </details>
    </AccordionItemContext.Provider>
  )
}

export function AccordionTrigger({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const itemContext = React.useContext(AccordionItemContext)
  const rootContext = React.useContext(AccordionContext)

  if (!itemContext || !rootContext) {
      throw new Error("AccordionTrigger must be used within AccordionItem and Accordion")
  }

  const handleClick = (e: React.MouseEvent) => {
    // Prevent default toggle behavior to control state via React
    e.preventDefault()
    rootContext.onValueChange(itemContext.value)
  }

  return (
     <summary
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline cursor-pointer list-none [&::-webkit-details-marker]:hidden",
          className
        )}
        onClick={handleClick}
        {...props}
     >
       {children}
       <ChevronDownIcon className="text-muted-foreground size-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
     </summary>
  )
}

export function AccordionContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("pb-4 pt-0 text-sm overflow-hidden", className)} {...props}>
      {children}
    </div>
  )
}
