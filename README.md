# FinanceApp - Sistema de Gestão Financeira

[![.NET](https://img.shields.io/badge/.NET-8.0-blue.svg)](https://dotnet.microsoft.com/download/dotnet/8.0)
[![React](https://img.shields.io/badge/React-19.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![SQL Server](https://img.shields.io/badge/SQL_Server-2022-blue.svg)](https://www.microsoft.com/sql-server)

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
- **ORM**: Entity Framework Core 9.0
- **Banco de Dados**: SQL Server 2022
- **Autenticação**: JWT (JSON Web Tokens) com Bearer Token
- **Hash de Senhas**: BCrypt.Net-Next para criptografia segura
- **Arquitetura**: Clean Architecture + Repository Pattern
- **Documentação**: Swagger/OpenAPI com autenticação JWT

### Frontend (React 19)
- **Framework**: React 19.1 com TypeScript 5.6
- **Estilização**: Styled Components 6.1
- **Roteamento**: React Router v6.26
- **Gerenciamento de Estado**: React Hooks + Context API
- **Requisições HTTP**: Axios 1.6
- **Ícones**: React Icons 5.5
- **Build Tool**: Vite 7.1 com SWC

### Banco de Dados
- **SGBD**: SQL Server 2022
- **Migrations**: Entity Framework Migrations
- **Provider**: Microsoft.EntityFrameworkCore.SqlServer 9.0
- **Configuração**: Connection string com Integrated Security

### DevOps & Ferramentas
- **Versionamento**: Git
- **IDE**: Visual Studio 2022 / VS Code
- **Package Manager**: NuGet (.NET) e npm (Node.js)

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

### Padrões de Projeto Implementados
- **Repository Pattern**: Para acesso a dados com Entity Framework
- **Unit of Work**: Para transações de banco
- **DTO Pattern**: Para transferência de dados entre camadas
- **Factory Pattern**: Para criação de entidades
- **Dependency Injection**: Para injeção de dependências

## Pré-requisitos

### Backend
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [SQL Server 2022](https://www.microsoft.com/sql-server/sql-server-downloads) ou SQL Server Express
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

# Restaure as dependências
dotnet restore

# Configure a string de conexão no appsettings.json
# "ConnectionStrings": {
#   "DefaultConnection": "Data Source=SEU_SERVIDOR\\SQLEXPRESS;Initial Catalog=FinanceAppDb;Integrated Security=True;MultipleActiveResultSets=true;TrustServerCertificate=True;"
# }

# Execute as migrations
dotnet ef database update

# Execute a aplicação
dotnet run
```

### 3. Configuração do Frontend
```bash
cd Finance.Web

# Instale as dependências
npm install

# Execute a aplicação
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

## Segurança

- **Autenticação JWT**: Tokens seguros com expiração configurável
- **Hash de Senhas**: BCrypt para criptografia segura de senhas
- **CORS**: Configurado para permitir apenas o frontend autorizado
- **HTTPS**: Redirecionamento automático para HTTPS em produção

## Autor

**Gustavo Henrique Barth**
- GitHub: [GustavoHBarth](https://github.com/GustavoHBarth)
- LinkedIn: [Gustavo Barth](https://www.linkedin.com/in/gustavo-henrique-barth)
- Email: barthgustavo5@gmail.com

---
