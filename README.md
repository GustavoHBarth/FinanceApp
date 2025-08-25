# FinanceApp - Sistema de Gestão Financeira

[![.NET](https://img.shields.io/badge/.NET-8.0-blue.svg)](https://dotnet.microsoft.com/download/dotnet/8.0)
[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.0-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Sobre o Projeto

O **FinanceApp** é uma aplicação web completa para gestão financeira pessoal, desenvolvida com arquitetura moderna e tecnologias atuais. O sistema permite controle total sobre contas, receitas, despesas e parcelamentos, oferecendo uma visão clara e organizada das finanças pessoais.

### Principais Características

- **Interface Responsiva**: Design moderno e adaptável a diferentes dispositivos
- **Autenticação Segura**: Sistema de login com JWT e autorização baseada em roles
- **Gestão Completa**: Controle de contas, receitas, despesas e parcelamentos
- **Filtros Avançados**: Sistema de busca e filtros para organização dos dados
- **Relatórios Visuais**: Dashboards com gráficos e métricas financeiras
- **Multi-usuário**: Suporte a múltiplos usuários com dados isolados

## Funcionalidades

### Dashboard Principal
- Visão geral das finanças do mês
- Resumo de gastos por categoria
- Controle de contas parceladas
- Gráficos e métricas financeiras

### Gestão de Contas
- Criação, edição e exclusão de contas
- Categorização automática
- Sistema de parcelamentos
- Controle de status (Pendente, Pago, Vencido, Cancelado)
- Filtros avançados por data, categoria e título

### Gestão de Receitas
- Controle de receitas mensais
- Categorização de receitas
- Histórico de entradas
- Relatórios de performance

###  Sistema de Filtros
- Busca por título em tempo real
- Filtros por categoria
- Filtros por período (data início/fim)
- Filtros avançados expansíveis

###  Gestão de Usuários
- Sistema de registro e login
- Perfis de usuário personalizáveis
- Isolamento de dados por usuário
- Recuperação de senha

## 🛠 Tecnologias Utilizadas

### **Backend (.NET 8)**
- **Framework**: ASP.NET Core 8.0
- **ORM**: Entity Framework Core 8.0
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT (JSON Web Tokens)
- **Validação**: FluentValidation
- **Mapeamento**: AutoMapper
- **Arquitetura**: Clean Architecture + Repository Pattern

### **Frontend (React 18)**
- **Framework**: React 18 com TypeScript
- **Estilização**: Styled Components
- **Roteamento**: React Router v6
- **Gerenciamento de Estado**: React Hooks + Context API
- **Requisições HTTP**: Axios
- **Ícones**: React Icons
- **Build Tool**: Vite

### **Banco de Dados**
- **SGBD**: PostgreSQL 15
- **Migrations**: Entity Framework Migrations
- **Índices**: Otimizados para consultas frequentes

### **DevOps & Ferramentas**
- **Versionamento**: Git

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture** e **SOLID**, organizado em camadas bem definidas:

```
FinanceApp/
├── 📁 FinanceApp.API        
├── 📁 FinanceApp.Application  
├── 📁 FinanceApp.Domain       
├── 📁 FinanceApp.Data         
└── 📁 Finance.Web             
```

### **Padrões de Projeto Implementados**
- **Repository Pattern**: Para acesso a dados
- **Unit of Work**: Para transações de banco
- **DTO Pattern**: Para transferência de dados
- **Factory Pattern**: Para criação de entidades
- **Strategy Pattern**: Para diferentes tipos de validação

## 📋 Pré-requisitos

### **Backend**
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [PostgreSQL 15+](https://www.postgresql.org/download/)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) ou [VS Code](https://code.visualstudio.com/)

### **Frontend**
- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## 🚀 Instalação

### **1. Clone o Repositório**
```bash
git clone https://github.com/seu-usuario/FinanceApp.git
cd FinanceApp
```

### **2. Configuração do Backend**
```bash
# Navegue para a pasta da API
cd FinanceApp.API

# Restaure as dependências
dotnet restore

# Configure a string de conexão no appsettings.json
# "ConnectionStrings": {
#   "DefaultConnection": "Host=localhost;Database=FinanceApp;Username=seu_usuario;Password=sua_senha"
# }

# Execute as migrations
dotnet ef database update

# Execute a aplicação
dotnet run
```

### **3. Configuração do Frontend**
```bash
# Navegue para a pasta do frontend
cd Finance.Web

# Instale as dependências
npm install

# Configure a URL da API no arquivo configs.ts
# const API_BASE_URL = 'https://localhost:7101';

# Execute a aplicação
npm run dev
```

### **4. Acesse a Aplicação**
- **Frontend**: http://localhost:5173
- **Backend API**: https://localhost:7101
- **Swagger**: https://localhost:7101/swagger

## 📖 Como Usar

### **1. Primeiro Acesso**
1. Acesse a aplicação no navegador
2. Clique em "Registrar" para criar uma conta
3. Faça login com suas credenciais

### **2. Criando uma Conta**
1. Clique no botão "+ Nova Conta"
2. Preencha os dados básicos (título, valor, categoria)
3. Configure informações adicionais (status, recorrência)
4. Salve a conta

### **3. Gerenciando Contas**
- **Visualizar**: Clique no ícone de olho para ver detalhes
- **Editar**: Clique no botão "Editar" para modificar
- **Excluir**: Clique no botão "Excluir" para remover

### **4. Usando Filtros**
- **Busca Rápida**: Digite no campo de busca para filtrar por título
- **Filtros Avançados**: Clique em "Filtros Avançados" para mais opções
- **Filtros por Data**: Selecione período específico
- **Filtros por Categoria**: Escolha categoria específica

## 🤝 Contribuição

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [Seu Nome](https://linkedin.com/in/seu-perfil)
- Email: seu-email@exemplo.com

---

⭐ **Se este projeto te ajudou, considere dar uma estrela no repositório!**
