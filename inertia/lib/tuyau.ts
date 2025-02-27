import { createTuyau } from '@tuyau/client'
import { api } from '../../.adonisjs/api'

export const tuyau = createTuyau({
  api,
  baseUrl: window.location.origin,
})
