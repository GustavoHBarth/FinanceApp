import axios from 'axios'
import { SERVER_HOSTNAME } from '@/configs'

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

const api = axios.create({
  baseURL: SERVER_HOSTNAME,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  let token: string | null = null
  try {
    
    token = getCookie('auth_token') || (typeof window !== 'undefined' ? localStorage.getItem('token') : null)
  } catch {}

  if (token) {
    config.headers = config.headers ?? {}
    ;(config.headers as any).Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error?.response?.data ?? error)
)

export default api


