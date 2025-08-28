import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '@/backend/api'
import { Wrapper, Content, Header, Box } from './RegisterPage.styles'
import { SlActionUndo } from 'react-icons/sl'

export default function RegisterPage() {
	const navigate = useNavigate()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!name.trim()) { alert('Informe seu nome'); return }
		if (password !== confirmPassword) { alert('As senhas não conferem'); return }
		try {
			const r = await api.post('/auth/register', { name, email, password })
			if (r.data?.Success === true || r.status === 200) {
				alert('Cadastro realizado com sucesso! Faça login para continuar.')
				navigate('/login', { replace: true })
			} else {
				alert(r.data?.Message || r.data?.message || 'Erro ao criar conta')
			}
		} catch (err: any) {
			alert(err?.response?.data?.Message || err?.response?.data?.message || 'Erro ao criar conta')
		}
	}

	return (
		<Wrapper>
			<Content>
				<Header>
					<button className="icon-btn" onClick={() => navigate(-1)}>
						<SlActionUndo size={20} />
					</button>
					<div style={{ width: 40 }} />
					<img src="/minilogo_financeapp-convertido.svg" alt="Logo" />
					<p>Finance App</p>
				</Header>

				<Box>
					<div className="title">Crie sua conta</div>
					<form onSubmit={handleRegister} autoComplete="off">
						<input id="register-name" name="register-name" placeholder="Nome" value={name} autoComplete="off" onChange={e => setName(e.target.value)} />
						<input id="register-email" name="register-email" placeholder="E-mail" value={email} autoComplete="off" onChange={e => setEmail(e.target.value)} />
						<input id="register-password" name="register-password" placeholder="Senha" type="password" value={password} autoComplete="new-password" onChange={e => setPassword(e.target.value)} />
						<input id="register-confirm" name="register-confirm" placeholder="Confirmar senha" type="password" value={confirmPassword} autoComplete="new-password" onChange={e => setConfirmPassword(e.target.value)} />
						<button type="submit">Criar conta</button>
					</form>
					<p><button className="switch" type="button" onClick={() => navigate('/login')}>Já tem conta? Fazer login</button></p>
				</Box>
			</Content>
		</Wrapper>
	)
}


