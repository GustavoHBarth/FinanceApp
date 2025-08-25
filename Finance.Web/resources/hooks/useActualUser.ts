import { useEffect, useState } from 'react'
import api from '@/backend/api'

type User = { id: string; name: string; email: string; createdAt?: string } | null

export function useActualUser() {
	const [user, setUser] = useState<User>(null)
	const [loading, setLoading] = useState(true)
	
	const fetchMe = () => {
		const token = localStorage.getItem('token')
		if (!token) { setUser(null); setLoading(false); return }
		setLoading(true)
		api.get('/auth/me')
		.then(r => setUser(r.data?.data ?? null))
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