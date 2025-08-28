export const DEV = import.meta.env.DEV
export const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN ?? 'localhost'
export const SERVER_PORT = Number(import.meta.env.VITE_SERVER_PORT ?? 7101)
export const CLIENT_DOMAIN = import.meta.env.VITE_CLIENT_DOMAIN ?? 'localhost'
export const CLIENT_PORT = Number(import.meta.env.VITE_CLIENT_PORT ?? 5173)

export const SERVER_HOSTNAME =
	import.meta.env.VITE_SERVER_HOSTNAME ?? `https://${SERVER_DOMAIN}:${SERVER_PORT}`

export const CLIENT_HOSTNAME =
	import.meta.env.VITE_CLIENT_HOSTNAME ?? `http://${CLIENT_DOMAIN}:${CLIENT_PORT}`

export const MAINTENANCE = (import.meta.env.VITE_MAINTENANCE ?? 'false') === 'true'


