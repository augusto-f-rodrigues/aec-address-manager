# AeC - Address Manager

Este projeto é uma aplicação desenvolvida em Next Js para o front-end e Node Js para o back-end com o conceito mobile-first para gerenciamento de endereços (crud).

## Índice

- [Recursos Principais](#recursos-principais)
- [Recursos Extras](#recursos-extras)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Scripts Disponíveis](#scripts-disponíveis)

## Recursos Principais

- Autenticação de usuário
- Validação de credenciais
- Redirecionamento para a página de endereços após login bem-sucedido
- Permite que o usuário adicione, visualize, edite e exclua endereços
- Cada endereço deve conter: cep, logradouro, complemento (opcional), bairro, cidade, uf, numero
- Permitir que o usuário exporte seus endereços salvos para um arquivo CSV
- Criação da tabela Usuários contendo: Id, nome, usuário e senha
- Criação da tabela de Endereços contendo: Id, cep, logradouro, complemento (opcional), bairro, cidade, uf, numero e id do usuário
- Informar um CEP para aplicação buscar os dados do endereço através da integração com a API do ViaCEP

## Recursos Extras

- Utilização do local storage para armazenamento de seção
- Validação com JWT
- Encriptação de senhas armazenadas no banco através do bcrypt
- Utilização da ORM Sequelize
- Utilização do Material UI
- Relacionamento entre tabelas não descrito no teste, com exclusão ou edição em cascata
- Criação de migrations para criação das tabelas

## Tecnologias Utilizadas

### Front-end

- [Next.js](https://nextjs.org/)
- [Material UI](https://mui.com/)
- [JWT](https://jwt.io/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)

### Back-end

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Concurrently](https://www.npmjs.com/package/concurrently)
- [Nodemon](https://nodemon.io/)
- [Sequelize](https://sequelize.org/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Cors](https://www.npmjs.com/package/cors)
- [Express](https://expressjs.com/)

## Pré-requisitos

Antes de começar, certifique-se de que você tenha o servidor local do PostgreSQL instalado em sua máquina e configure os valores das chaves no arquivo backend/.env e também no arquivo backend/config/config.json conforme necessário. Certifique-se também de ter o Node.js e o npm instalados.

## Instalação

Clone o repositório e instale as dependências de ambas as frentes (back-end e front-end):

```bash
git clone https://github.com/augusto-f-rodrigues/aec-address-manager
cd mobiauto-tabela-fipe
cd backend 
npm install
npm run migration
cd ../frotend
npm install
```

## Scripts Disponíveis

### Frontend

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Cria a build de produção da aplicação.
- `npm run start`: Inicia o servidor da aplicação em modo de produção.
- `npm run lint`: Executa a verificação de lint para encontrar e corrigir problemas no código.

### Backend

- `npm run build`: Compila o código TypeScript para JavaScript.
- `npm run start`: Inicia a aplicação usando o arquivo JavaScript compilado.
- `npm run dev`: Habilita o modo de desenvolvimento, recompilando automaticamente o código TypeScript e reiniciando o servidor Node.js quando há alterações.
- `npm run migration`: Executa as migrações do banco de dados para atualizar o esquema conforme o modelo de dados.
- `npx sequelize-cli migration:generate --name [digite o nome aqui]`: Criação de uma nova migration