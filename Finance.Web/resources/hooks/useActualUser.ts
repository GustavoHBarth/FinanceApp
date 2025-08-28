import { useEffect, useState } from 'react'
import api from '@/backend/api'

type User = { id: string; name: string; email: string; createdAt?: string } | null

export function useActualUser() {
	const [user, setUser] = useState<User>(null)
	const [loading, setLoading] = useState(true)
	
	const fetchMe = () => {
		setLoading(true)
		api.get('/auth/me')
		.then(r => {
			const u = r.data?.data
			if (u) {
				setUser({
					id: String(u.id ?? ''),
					name: typeof u.name === 'string' ? u.name : '',
					email: typeof u.email === 'string' ? u.email : '',
					createdAt: u.createdAt
				})
			} else {
				setUser(null)
			}
		})
		.catch(() => setUser(null))
		.finally(() => setLoading(false))
	}
	
	useEffect(() => {
		fetchMe()
		const onAuth = () => fetchMe()
		window.addEventListener('auth-changed', onAuth)
		window.addEventListener('storage', onAuth)
		return () => {
			window.removeEventListener('auth-changed', onAuth)
			window.removeEventListener('storage', onAuth)
		}
	}, [])
	
	return { user, loading }
}