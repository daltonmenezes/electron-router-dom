'use client'

import dynamic from 'next/dynamic'

const Vortex = dynamic(() => import('./vortex'), {
  ssr: false,
})

export function VortexWrapper(props: any) {
  return <Vortex {...props} />
}
