# API de Transferências e Usuários

Esta API permite login, registro de usuários, consulta de usuários e transferência de valores. O objetivo é servir de base para estudos de testes e automação de APIs.

## Instalação

1. Clone o repositório ou baixe os arquivos.
2. Instale as dependências:

```sh
npm install
```

## Dependências principais
- express
- swagger-ui-express

## Dependências de desenvolvimento
- mocha
- supertest
- sinon

## Executando a API

```sh
node server.js
```

A API estará disponível em `http://localhost:3000`.

## Documentação Swagger

Acesse a documentação interativa em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints principais

- `POST /api/users/register` — Registro de usuário
- `POST /api/users/login` — Login de usuário
- `GET /api/users` — Listar usuários
- `POST /api/transfers` — Realizar transferência
- `GET /api/transfers` — Listar transferências

## Regras de negócio

- Login exige usuário e senha.
- Não é permitido registrar usuários duplicados.
- Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos.
- O banco de dados é em memória.

## Testes

Os testes podem ser implementados com Mocha, Supertest e Sinon.

---

> Para dúvidas ou sugestões, abra uma issue.
