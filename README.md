# FinanceApp

FinanceApp é uma aplicação financeira projetada para ajudar os usuários a gerenciar suas transações, visualizar relatórios detalhados, e categorizar suas receitas e despesas. 
A aplicação oferece funcionalidades como geração de relatórios de transações, filtragem de dados, exportação para CSV e PDF, e visualização de totais e médias de transações.

## Tecnologias Usadas

### Backend
* C#
* .NET SDK instalado
* Git instalado para clonar o repositório
* ASP.NET Core: Framework utilizado para desenvolver a API.
* Entity Framework Core: ORM para acesso ao banco de dados.
* MySQL: Banco de dados utilizado para armazenar as transações.
* JWT: Para autenticação e controle de acesso.

### Frontend (Futuro)
* Angular: Framework para desenvolvimento do frontend.
* HTML/CSS/JavaScript: Tecnologias básicas para construção das páginas.

### Bibliotecas
* iTextSharp: Para gerar o relatório em PDF.
* CsvHelper: Para exportação de relatórios em CSV.
* BouncyCastle.NetCore: Para criptografia no iTextSharp.

## Funcionalidades

### Backend
* Autenticação de Usuários
* Implementação de autenticação com JWT.
* Proteção de rotas utilizando JWT para garantir que apenas usuários autenticados possam acessar os dados.

### CRUD de Transações
* Criação: Os usuários podem adicionar novas transações financeiras com a categoria e o valor.
* Leitura: Exibição de transações filtradas por data e categoria.
* Edição: Modificação de transações existentes.
* Exclusão: Exclusão de transações.

### Relatórios
* Relatório Total: Geração de um relatório com o total de transações, tanto de despesas quanto de receitas.
* Relatório por Categoria: Agrupamento de transações por categoria e cálculo do total em cada uma.
* Média de Transações: Cálculo da média diária, semanal e mensal das transações.

### Exportação de Relatórios
* Geração de relatórios em formatos CSV e PDF.

### Frontend (Futuro)
* O desenvolvimento do frontend será realizado em Angular, com a criação de interfaces para visualização de transações, geração de relatórios e exportação de dados.

## Como rodar o projeto
### 1️⃣ Clone o repositório
    git clone <URL_DO_REPOSITORIO>
    cd FinanceApp

### 2️⃣ Instale as dependências do projeto:
    dotnet restore

### 3️⃣ Configure a conexão com o banco de dados MySQL e adicione a string de conexão no appsettings.json.

### 4️⃣ Aplique as migrations:
    dotnet ef database update
    
### 5️⃣ Rode a aplicação:
    dotnet run

## Frontend (Futuro)

## Como Usar
* Autenticação: Para interagir com a aplicação, o usuário deve primeiro realizar login, o que gerará um JWT.
* Transações: O usuário pode adicionar transações, visualizá-las, filtrá-las por data e categoria.
* Relatórios: Após adicionar transações, é possível visualizar relatórios totais por categoria, médias de transações, e exportar os dados em CSV ou PDF.

## Melhorias Futuras
* Dashboard: Implementação de gráficos para visualização das transações.
* Funcionalidades Avançadas de Relatórios: Como a comparação de transações entre diferentes períodos.
* Integração com APIs Externas: Como APIs de taxas de câmbio ou serviços bancários.

## 🤝 Contribuições
Fique à vontade para dar dicas e sua sugestão! Se tiver alguma dúvida, me avise.

📩 Linkedin: [www.linkedin.com/in/gustavo-henrique-barth]
📩 Email: [barthgustavo5@gmail.com]



    
