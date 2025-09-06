import { FaWallet } from 'react-icons/fa';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { TbPigMoney } from "react-icons/tb";
import { LiaCoinsSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';

import { Whapper, Body, MenuButton } from './sideBar.style';

export default function SideBar() {
    const navigate = useNavigate()

    const menuItens = [
        {
            label: 'Resumo Mensal', 
            icon: <FaWallet />,
            path: '/app'
        },
        {
            label: 'Despesas', 
            icon: <FaWallet />,
            path: '/app/contas'
        },
        {
            label: 'Receitas',
            icon: <FaMoneyBill1Wave />,
            path: '/app/receitas'
        },
        {
            label: 'Investimentos',
            icon: <LiaCoinsSolid />,
            path: '/app/receitas'
        },
        {
            label: 'Metas',
            icon: <TbPigMoney />,
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