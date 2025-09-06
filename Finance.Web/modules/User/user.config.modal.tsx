import { Modal } from '@/resources/components';
import { useActualUser } from '@/resources/hooks/useActualUser';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/backend/api';

import { Whapper, SideBar, SideBarItem, Content } from './user.config.modal.style';

interface UserConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UserConfigModal ({ isOpen, onClose }: UserConfigModalProps ) {
    const { user } = useActualUser()
    const userName = user?.name ?? user?.email
    const [selected, setSelected] = useState<"informacoes" | "tema" | "sair">("informacoes")
    const navigate = useNavigate();

     async function logout() {
            try {
                await api.post('/auth/logout')
            } catch {}

            try { 
                localStorage.removeItem('token'); 
                localStorage.setItem('auth', 'false') 
            } catch {}

            window.dispatchEvent(new Event('auth-changed'))
            navigate('/', { replace: true })
        }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Configurações" size="medium">
            <Whapper>
                <SideBar>
                    <SideBarItem $active={selected === "informacoes"} onClick={() => setSelected("informacoes")}>
                        Informações
                    </SideBarItem>
                    <SideBarItem $active={selected === "tema"} onClick={() => setSelected("tema")}>
                        Tema
                    </SideBarItem>
                    <SideBarItem $active={selected === "sair"} onClick={logout}>
                        Sair
                    </SideBarItem>
                </SideBar>

                <Content>
                    {selected === "informacoes" &&
                        <div className='info'>
                            <span>{userName}</span>
                            <span>{user?.email}</span>
                        </div>
                    }
                </Content>
            </Whapper>
        </Modal>
    )
}

