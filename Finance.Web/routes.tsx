import { Routes, Route } from 'react-router-dom'
import AppLayout from '@/resources/components/Layout/App'
import ProtectedRoute from '@/resources/components/ProtectedRoute'

import HomePage from '@/views/HomePage'
import LoginPage from '@/views/Login/LoginPage'
import RegisterPage from '@/views/Login/RegisterPage'
import NotFound from '@/views/NotFound'
import ContasPage from './modules/Contas/contas.home'
import SaibaMaisPage from '@/views/SaibaMais'

export default function ApplicationRoutes() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/saiba-mais" element={<SaibaMaisPage />} />
			
			<Route element={<ProtectedRoute />}>
			<Route path="/app" element={<AppLayout />}>
			<Route path="contas" element={<ContasPage />} />
			</Route>
		</Route>
		
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}


