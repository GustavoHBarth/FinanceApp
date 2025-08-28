import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '@/backend/api'
import { Wrapper, Content, LoginHeader, Box } from '@/views/Login/LoginPage.styles'
import { SlActionUndo } from 'react-icons/sl'

export default function LoginPage() {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	
	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		
		const r = await api.post('/auth/login', { email, password });
		const { token } = r.data?.data ?? {};
		
		if (token) {
			// Token agora é enviado via cookie HttpOnly pelo backend
			window.dispatchEvent(new Event('auth-changed'))
			navigate('/app', { replace: true })
		} else {
			alert('Resposta de login inválida');
		}
	}

	return (
		<Wrapper>
			<Content>
				<LoginHeader>
					<button className="icon-btn" onClick={() => navigate('/')}>
						<SlActionUndo  size={20} />
					</button>
					<div style={{ width: 40 }} />
					<img src="/minilogo_financeapp-convertido.svg" alt="Logo" />
					<p>Finance App</p>
				</LoginHeader>
				
				<Box>
					<div className="titlelogin"> Faça login na sua conta</div>
					<form onSubmit={handleLogin} autoComplete="off">
						<input 
							id="login-email"
							name="login-email"
							placeholder="E-mail" 
							value={email} 
							autoComplete="off"
							onChange={e => setEmail(e.target.value)} />
						
						<input 
							id="login-password"
							name="login-password"
							placeholder="Senha" 
							type="password" 
							value={password}
							autoComplete="new-password"
							onChange={e => setPassword(e.target.value)} />
						
						<button type="submit">Entrar</button>
					</form>
					<p className="accountCreate">Ainda não tem conta? <button className="create" type="button" onClick={() => navigate('/register')}>Criar uma conta</button></p>
				</Box>
			</Content>
		</Wrapper>
	)
}


