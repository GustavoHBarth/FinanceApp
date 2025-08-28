import styled from 'styled-components'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useActualUser } from '@/resources/hooks/useActualUser'
import api from '@/backend/api'

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: transparent;
    box-sizing: border-box;
    min-height: 100vh;
    padding: 12px 0 30px 0;
`

const Container = styled.div`
    margin: 0 auto;
    padding: 24px;
    width: min(100%, 1280px);
    color: var(--color-text-primary);
`

const LandingBar = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
    position: static;
	width: min(100% - 24px, 1280px);
	height: 72px;
	margin: 0 auto 45px auto;
	padding: 0 16px;
	border-radius: 0;
	background: transparent;
	border: none;
	backdrop-filter: none;
	box-shadow: none;

    .left, .right { 
        display: flex; 
        align-items: center; 
        gap: 12px;
    }

    .logo { 
        display:flex; 
        align-items:center; 
        gap:10px; color: var(--color-text-primary); 
        font-weight:700; 
        font-size: 28px; 
    }

    .left .navbtn:first-of-type { 
        margin-left: 48px; 
    }

    .left .navbtn + .navbtn { 
        margin-left: 6px;
    }

    .navbtn { 
        position: relative; 
        background: transparent; 
        border: 0; 
        color: var(--color-text-primary); 
        cursor: pointer; 
        padding: 12px 14px;
        border-radius: 8px; 
        font-size: 18px; 
        font-weight: 600; 

        ::before { 
            background: transparent;
        }
    }

   
    .navbtn::after {
        content: '';
        position: absolute;
        left: 12px;
        bottom: 6px;
        width: 20%;
        height: 2px;
        background: var(--color-primary);
        border-radius: 2px;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform .18s ease;
        opacity: .9;
        pointer-events: none;
    }

    .navbtn:hover::after { 
        transform: scaleX(1); 
    }

    .cta { 
        padding: 12px 18px; 
        border-radius: 9999px; 
        border: none; background: 
        var(--color-primary); 
        color: #fff; cursor: 
        pointer; font-weight:700; 
        font-size: 15px; 
    }

    .user { 
        color: var(--color-text-primary); 
        font-weight: 700; 
    }

    .icon-btn { 
        background: transparent; 
        border: 0; padding: 6px; 
        border-radius: 6px; color: 
        var(--color-text-secondary); 
        cursor: pointer; 
        display: inline-flex; 
        align-items: center; 
        justify-content: center; 

        &:hover { 
            background: var(--neutral-800); 
        }
    }
`

const Hero = styled.div`
    margin-top: 24px;
    display: grid;
    grid-template-columns: 520px 1fr;
    gap: 0;
    align-items: start;
    position: relative;

    @media (max-width: 960px) {
        grid-template-columns: 1fr;
    }
`

const Illustration = styled.div`
    background: rgba(255,255,255,0.03);
	border: 1px solid rgba(255,255,255,0.08);
	border-radius: 24px;
	padding: 16px 16px 12px 16px;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	z-index: 2;
	backdrop-filter: blur(8px);
	box-shadow: 0 18px 40px rgba(0,0,0,0.35);
	transform: translateY(-70px);

	img {
		width: 100%;
		height: auto;
		border-radius: 12px;
		object-fit: cover;
	}

    @media (max-width: 960px) {
        margin-left: 0;
    }
`

const Panel = styled.div`
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    min-height: clamp(560px, 70vh, 820px);
    padding: 24px;
    padding-left: 220px;
    padding-bottom: 96px;
    margin-left: -160px;
    transform: none;
    position: relative;
    z-index: 1;
    overflow: hidden;
    backdrop-filter: blur(8px);
    box-shadow: 0 18px 40px rgba(0,0,0,0.35);

    .title { 
        font-size: 44px; 
        font-weight: 800; 
        margin: 0 0 16px 0; 
        line-height: 1.15; 
    }

    .subtitle { 
        color: var(--color-text-secondary); 
        margin-bottom: 24px; 
        font-size: 20px; 
    }

    .featureList { 
        list-style: none; 
        padding: 0; 
        margin: 12px 0 32px 0; 
        display: grid; 
        gap: 20px; 
    }
    
    .featureItem { 
        display: flex; 
        align-items: center;
        gap: 16px; 
        color: var(--color-text-primary); 
        font-size: 22px; 
        line-height: 1.65; 
        font-weight: 600;
        padding: 10px 14px; 
        border-radius: 14px;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.06);
    }

    .featureItem svg { 
        color: var(--color-primary); 
        font-size: 28px; 
        flex-shrink: 0; 
    }

    .actions { 
        position: absolute; 
        left: 0; 
        right: 0; 
        bottom: 24px; 
        display: flex; 
        gap: 12px; 
        justify-content: center; 
        margin-top: 0;
    }

    .btn { 
        padding: 14px 28px; 
        border-radius: 9999px; 
        border: 1px solid rgba(255,255,255,0.12);
        background: var(--color-surface-2); 
        color: var(--color-text-primary);
        cursor: pointer;
        font-size: 18px; 
        transition: transform .15s ease, box-shadow .15s ease;
        box-shadow: 0 8px 20px rgba(0,0,0,0.25);
    }

    .btn.primary { 
        background: var(--color-primary); 
        color: white; 
        border-color: var(--color-primary); 

        &:hover { 
            transform: translateY(-2px); 
            box-shadow: 0 12px 28px rgba(34,197,94,0.35); 
        }
    }

    @media (max-width: 960px) {
        margin-left: 0;
        transform: none;
        padding-left: 24px;
    }
`

export default function SectionOne() {
    const navigate = useNavigate()
    const { user } = useActualUser()

    async function logout() {
        try { await api.post('/auth/logout') } catch {}
        try { localStorage.removeItem('token'); localStorage.setItem('auth', 'false') } catch {}
        window.dispatchEvent(new Event('auth-changed'))
        navigate('/', { replace: true })
    }
    return (
        <Section id="section-one">
            <LandingBar>
                <div className="left">
                    <div className="logo">
                        <img src="/minilogo_financeapp-convertido.svg" alt="Logo" style={{ height: 70 }} />
                        <span>FinanceApp</span>
                    </div>
                    <button className="navbtn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Inicio</button>
                    <button className="navbtn" onClick={() => document.getElementById('section-two')?.scrollIntoView({ behavior: 'smooth' })}>Saiba mais</button>
                    <button className="navbtn" onClick={() => document.getElementById('section-three')?.scrollIntoView({ behavior: 'smooth' })}>Como funciona</button>
                    <button className="navbtn" onClick={() => navigate('/app')}>Sistema</button>
                </div>
                <div className="right">
                {user ? (
                    <>
                        <span className="user">{user.name || user.email}</span>
                        <button className="icon-btn" onClick={logout}><FiLogOut size={18} /></button>
                    </>
                ) : (
                    <>
                        <button className="navbtn" onClick={() => navigate('/login')}>Login</button>
                        <button className="cta" onClick={() => navigate('/register')}>Comece já</button>
                    </>
                )}
                </div>
            </LandingBar>
            <Container>
            <Hero>
                <Illustration>
                    <img src="/finance-hero.svg.svg" alt="Finance app" />
                </Illustration>
                <Panel>
                    <div className="title">Controle financeiro inteligente em suas mãos</div>
                    <div className="subtitle">Gerencie contas, receitas, investimentos e acompanhe suas metas em dashboards claros e objetivos.</div>
                    <ul className="featureList">
                        <li className="featureItem"><IoCheckmarkCircleOutline /> Gestão financeira simples e poderosa</li>
                        <li className="featureItem"><IoCheckmarkCircleOutline /> Controle total da sua vida financeira</li>
                        <li className="featureItem"><IoCheckmarkCircleOutline /> Planeje, acompanhe e conquiste seus objetivos</li>
                        <li className="featureItem"><IoCheckmarkCircleOutline /> Seu painel financeiro completo</li>
                        <li className="featureItem"><IoCheckmarkCircleOutline /> Mais do que um gerenciador de contas</li>
                    </ul>
                    <div className="actions">
                        <button className="btn primary" onClick={() => navigate('/register')}>Começar Agora</button>
                    </div>
                </Panel>
            </Hero>
            </Container>
        </Section>
    )
}


