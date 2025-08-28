    import { useNavigate } from 'react-router-dom'
    import { useActualUser } from '@/resources/hooks/useActualUser'
    import styled from 'styled-components';
    import { FiLogOut } from 'react-icons/fi'
    import api from '@/backend/api'
    
    const Whapper = styled.div<{ $variant: 'default' | 'floating' }>`
        position: sticky;
        top: ${props => props.$variant === 'floating' ? '12px' : '0'};
        z-index: 100;
        height: 64px;
        font-size: 20px;
        background: ${props => props.$variant === 'floating' 
            ? 'rgba(255,255,255,0.04)'
            : 'var(--color-surface-1)'};
        border-bottom: ${props => props.$variant === 'floating' 
            ? 'none' 
            : '1px solid var(--color-border)'};
        border: ${props => props.$variant === 'floating' ? 'none' : 'none'};
        border-radius: ${props => props.$variant === 'floating' ? '16px' : '0'};
        backdrop-filter: ${props => props.$variant === 'floating' ? 'blur(8px)' : 'none'};
        box-shadow: ${props => props.$variant === 'floating' ? '0 12px 28px rgba(0,0,0,0.20)' : 'none'};
        width: ${props => props.$variant === 'floating' ? 'min(100% - 24px, 1280px)' : '100%'};
        margin: ${props => props.$variant === 'floating' ? '0 auto' : '0'};
        padding: ${props => props.$variant === 'floating' ? '0 8px' : '0'};

        .app-internal {
            width: 100%;
            padding: 8px 16px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between; 
            height: 64px;
        }    
    `;

        const Left = styled.div`
            display: flex;
            align-items: center;
            gap: 12px;

            .logo {
                padding: 0;
                margin: 0;
                border: 0;
                background: transparent;
                cursor: pointer;
                display: flex;
                align-items: center;

                img {
                    height: 40px;
                    width: auto;
                    display: block;
                    background: transparent;
                }
            }

            .button {
                background: transparent;
                border: 0;
                padding: 10px;
                margin: 0;
                border-radius: 0;
                color: var(--color-text-primary);
                cursor: pointer;
                font: inherit;
                text-decoration: none;

                &:hover {
                    background: var(--neutral-800);
                }
            }

            .sep {
                display: inline-block;        
                width: 1px;                  
                height: 20px;                 
                background-color: var(--color-text-muted); 
                margin: 0 8px;                
                vertical-align: middle;          
            }
        `;

    const Right = styled.div`
        display: flex;
        align-items: center;
        gap: 12px;
        margin-right: 8px;
        padding: 0 4px;
        text-transform: uppercase;  
        

        .icon-btn {
            background: transparent;
            border: 0;
            padding: 4px;
            margin: 0;
            border-radius: 6px;
            cursor: pointer;
            color: var(--color-text-secondary);
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .login {
            background: transparent;
            border: none;
            color: var(--color-text-primary);
            cursor: pointer;
            border-radius: 4px;
            transition: background 0.2s ease;
            padding: 10px;
            font-size: 20px;

            &:hover {
                background: var(--neutral-800);
            }
        }
    `;
    
    export default function Header({ variant = 'default' }: { variant?: 'default' | 'floating' }) {
        const navigate = useNavigate()
        const { user } = useActualUser()
        const userName = user?.name ?? user?.email
        
        async function logout() {
            try {
                await api.post('/auth/logout')
            } catch {}
            // limpar qualquer resquício legado
            try { localStorage.removeItem('token'); localStorage.setItem('auth', 'false') } catch {}
            window.dispatchEvent(new Event('auth-changed'))
            navigate('/', { replace: true })
        }
        
        return (
            <>
            
            <Whapper $variant={variant}>
                <div className="app-internal">
            
                    <Left>
                        <button className="logo" onClick={() => navigate('/')}
                            aria-label="Ir para a página inicial">
                            <img src="/minilogo_financeapp-convertido.svg" alt="Logo" />
                        </button>
                        <button className="button" onClick={() => navigate('/')}>Home</button>
                        <span className="sep"></span>
                        <button className="button" onClick={() => navigate('/app')}>App</button>
                    </Left>

                    <Right>
                        {userName ? (
                            <>
                            <span>{userName}</span>
                            <button className="icon-btn" onClick={logout}>
                                <FiLogOut size={20} />
                            </button>
                            </>
                        ) : (
                            <button className="login" onClick={() => navigate('/login')}>Login</button>
                        )}
                    </Right>
                </div>
            </Whapper>
            </>
        )
    }