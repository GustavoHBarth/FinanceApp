    import { useNavigate } from 'react-router-dom'
    import { useActualUser } from '@/resources/hooks/useActualUser'
    import styled from 'styled-components';
    import { BiCog } from "react-icons/bi";
    
    import { useState } from "react";
    import UserConfigModal from '@/modules/User/user.config.modal';
    
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
                margin-right: 30px;

                border: 0;
                background: transparent;
                cursor: pointer;
                display: flex;
                align-items: center;

                img {
                    height: 50px;
                    width: auto;
                    display: block;
                    background: transparent;
                }

                span {
                    font-size: 22px;
                    color: var(--color-text-primary)
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
                    border-radius: 10px;
                }
            }
        `;

    const Right = styled.div`
        display: flex;
        align-items: center;
        gap: 12px;
        margin-right: 8px;
        padding: 0 4px;
        text-transform: uppercase;  
        

        .config-btn {
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
        const [isOpen, SetIsOpen] = useState(false);
        
        return (
            <>
            
            <Whapper $variant={variant}>
                <div className="app-internal">
            
                    <Left>
                        <button className="logo" onClick={() => navigate('/')}
                            aria-label="Ir para a página inicial">
                            <img src="/minilogo_financeapp-convertido.svg" alt="Logo" />
                            <span className="logo-text">FinanceApp</span>
                        </button>
                    </Left>

                    <Right>
                        {userName ? (
                            <>
                            <span>{userName}</span>
                            <button className="config-btn" onClick={() => SetIsOpen(true)}> 
                                <BiCog  size={20} />
                            </button>
                            </>
                        ) : (
                            <button className="login" onClick={() => navigate('/login')}>Login</button>
                        )}
                    </Right>
                </div>
            </Whapper>
            <UserConfigModal isOpen={isOpen} onClose={() => SetIsOpen(false)} />
            </>
        )
    }