import { createElectronRouter } from 'electron-router-dom'

export const { Router, registerRoute, settings } = createElectronRouter({
  types: {
    ids: ['main'],
  },
})
