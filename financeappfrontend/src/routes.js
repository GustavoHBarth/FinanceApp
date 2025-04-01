import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Importe seus componentes ou páginas
import Transactions from './pages/Transactions'; // Outra página
import Login from './pages/Login'; // Página de login

const RoutesApp = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />  {/* Rota para a página inicial */}
                <Route path="/transactions" element={<Transactions />} /> {/* Rota para transações */}
                <Route path="/login" element={<Login />} /> {/* Rota para o login */}
            </Routes>
        </Router>
    );
};

export default RoutesApp;
