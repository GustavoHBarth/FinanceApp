import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Importe seus componentes ou p�ginas
import Transactions from './pages/Transactions'; // Outra p�gina
import Login from './pages/Login'; // P�gina de login

const RoutesApp = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />  {/* Rota para a p�gina inicial */}
                <Route path="/transactions" element={<Transactions />} /> {/* Rota para transa��es */}
                <Route path="/login" element={<Login />} /> {/* Rota para o login */}
            </Routes>
        </Router>
    );
};

export default RoutesApp;
