'use client'

import dynamic from 'next/dynamic'
import { ComponentProps } from 'react'

const Vortex = dynamic(() => import('./ui/vortex'), {
  ssr: false,
})

export function VortexWrapper(props: ComponentProps<typeof Vortex>) {
  return <Vortex {...props} />
}
