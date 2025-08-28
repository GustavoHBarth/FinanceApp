import { Navigate, Outlet } from 'react-router-dom'
import { useActualUser } from '@/resources/hooks/useActualUser'

export default function ProtectedRoute() {
	const { user, loading } = useActualUser()
	
	if (loading) return null
	return user ? <Outlet /> : <Navigate to="/login" replace />
}


