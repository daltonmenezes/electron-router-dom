import { createElectronRouter } from 'electron-router-dom'

export const { Router, registerRoute, settings } = createElectronRouter({
  port: 4321,

  types: {
    ids: ['main'],
    queryKeys: ['version'],
  },
})
