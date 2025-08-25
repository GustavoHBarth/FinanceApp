# FinanceApp - Sistema de Gestão Financeira

[![.NET](https://img.shields.io/badge/.NET-8.0-blue.svg)](https://dotnet.microsoft.com/download/dotnet/8.0)
[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.0-blue.svg)](https://www.postgresql.org/)

## Sobre o Projeto

O **FinanceApp** é uma aplicação web completa para gestão financeira pessoal, desenvolvida com arquitetura moderna e tecnologias atuais. O sistema permite controle total sobre contas, receitas, despesas e parcelamentos, oferecendo uma visão clara e organizada das finanças pessoais.

### Principais Características

- Interface responsiva e adaptável a diferentes dispositivos
- Sistema de autenticação seguro com JWT
- Gestão completa de contas, receitas e despesas
- Sistema de parcelamentos e categorização
- Dashboard com métricas e relatórios financeiros
- Suporte a múltiplos usuários com dados isolados

## Tecnologias Utilizadas

### Backend (.NET 8)
- **Framework**: ASP.NET Core 8.0
- **ORM**: Entity Framework Core 8.0
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT (JSON Web Tokens)
- **Arquitetura**: Clean Architecture + Repository Pattern

### Frontend (React 18)
- **Framework**: React 18 com TypeScript
- **Estilização**: Styled Components
- **Roteamento**: React Router v6
- **Gerenciamento de Estado**: React Hooks + Context API
- **Build Tool**: Vite

## Arquitetura

O projeto segue os princípios da **Clean Architecture** e **SOLID**, organizado em camadas bem definidas:

```
FinanceApp/
├── FinanceApp.API
├── FinanceApp.Application
├── FinanceApp.Domain
├── FinanceApp.Data
└── Finance.Web
```
## Pré-requisitos

### Backend
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [PostgreSQL 15+](https://www.postgresql.org/download/)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) ou [VS Code](https://code.visualstudio.com/)

### Frontend
- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação

### 1. Clone o Repositório
```bash
git clone https://github.com/GustavoHBarth/FinanceApp.git
cd FinanceApp
```

### 2. Configuração do Backend
```bash
cd FinanceApp.API
dotnet restore
dotnet ef database update
dotnet run
```

### 3. Configuração do Frontend
```bash
cd Finance.Web
npm install
npm run dev
```

### 4. Acesse a Aplicação
- **Frontend**: http://localhost:5173
- **Backend API**: https://localhost:7101
- **Swagger**: https://localhost:7101/swagger

## Funcionalidades Principais

- **Dashboard Financeiro**: Visão geral das finanças com métricas e gráficos
- **Gestão de Contas**: Criação, edição e controle de contas e despesas
- **Sistema de Parcelamentos**: Controle de contas parceladas com vencimentos
- **Categorização**: Organização automática por categorias
- **Filtros e Busca**: Sistema de filtros para organização dos dados
- **Relatórios**: Geração de relatórios financeiros personalizados

## Autor

**Gustavo Henrique Barth**
- GitHub: [GustavoHBarth](https://github.com/GustavoHBarth)
- LinkedIn: [Gustavo Barth](https://www.linkedin.com/in/gustavo-henrique-barth)
- Email: barthgustabo5@gmail.com

---
