# GlobalTecnlogia

Projeto Teste para Global Tecnlogia

> O Documento abaixo terá uma breve descrição do projeto

### #BackEnd

_Tecnologias_

### #BackEnd

-   NodeJS
-   TypeScript
-   Express
-   EsLint
-   Prettier
-   TypeORM
-   SQLite
-   Bcrypt
-   JWToken
-   Class Validator
-   Uuid

## Features

1. Cadastro de Usuários
2. Edição de Usuários
3. Exclusão de Usuários
4. Autenticação de Usuários

## Instalação das dependências

_Após fazer a copia do repositório executar o comando abaixo para fazer download de todos as dependncias_^

> NPM i

## Rodando a migrations

_Para criação do banco de dados será necessário executar o comando abaixo_^

> NPM run typeorm migration:run

-   CreateUserTable : Criação da tabela de Usuários
-   MockUsuarios: Inserção de Usuários no banco de dados

## Rodando o Projeto

_O projeto deverá ser rodado pelo comando abaixo_^

> NPM run dev:server
> O servidor será iniciado em : http://localhost:3031

## EndPoints

### Usuários

> EndPoint protegido por autenticação

### 1. Busca todos usuários

> _[get] /Api/Users_

---

### 2. Busca um usuário especifico

-   Parametros
    { id: string }
    > _[get] /Api/Users/:Id_

---

### 3. Criação de usuário

> _[post] /Api/Users_

-   Body
    {
    "name": string,
    "email": string,
    "passwordHash": string,
    "nivel": string
    }

---

### 4. Atualização de usuário

-   Parametros
    { id: string }
-   Body
    {
    "name": string,
    "email": string,
    "passwordHash": string,
    "nivel": string
    }
    > _[put] /Api/Users/:Id_

---

### 5. Delete

> _[delete] /Api/Users/:Id_

-   Parametros
    { id: string }

---

### Autenticação

### 1. Get - Valida Token

-   Parametros
    { id: string }

> _[get] /Api/Auth/:Id_

---

### 2. Login

-   Body
    { email: string,
    password:string
    }

> _[post] /Api/Users_

---
