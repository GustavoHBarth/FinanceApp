import { FaWallet } from 'react-icons/fa';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import { Whapper, Body, MenuButton } from './sideBar.style';

export default function SideBar() {
    const navigate = useNavigate()

    const menuItens = [
        {
            label: 'Contas', 
            icon: <FaWallet />,
            path: '/app/contas'
        },
        {
            label: 'Receitas',
            icon: <FaMoneyBill1Wave />,
            path: '/app/receitas'
        },
    ];

    return (
        <Whapper>
            <Body>
                
                {menuItens.map((item, i) => (
                    <MenuButton key={i} onClick={() => navigate(item.path)}>
                        {item.icon}
                        <span>{item.label}</span>
                    </MenuButton>
                ))}
            </Body>
        </Whapper>

        
    );
} 