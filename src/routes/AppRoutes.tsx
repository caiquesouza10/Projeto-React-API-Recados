import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../config/layout/DefaultLayout';
import WelcomeLayout from '../config/layout/WelcomeLayout';
import TesteLogin from '../pages/login/Login';
import TesteCadastro from '../pages/cadastro/Cadastro';
import HomeRecado from '../pages/recado/HomeRecado';
import RecadosArquivados from '../pages/arquivados/RecadosArquivados';
import LayoutArquivado from '../config/layout/LayoutArquivado';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TesteLogin />} />
        <Route path="/Cadastro" element={<TesteCadastro />} />
        <Route path="/Homerecado" element={<DefaultLayout component={HomeRecado} />} />
        <Route path="/RecadoArquivados" element={<LayoutArquivado component={RecadosArquivados} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
