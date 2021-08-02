# ROTEIRO DE TESTES - Usuários
> [[Voltar]](__index.md) 
***
>Esse roteiro orienta a sequência e quais testes devem ser realizados

---

## **Users**

### Teste de Respositorios
*Testes no respositorios são testes realizados diretamente no banco de dados.*

### 1. Create
    1.1 Shouldn't not enter a new user if it does not have all required fields  
        - Não deve inserir um novo usuário se ele não tiver todos os campos obrigatórios  
    1.2 Should insert a new user  
        - Deve inserir um novo usuário
    1.3 Must not enter a new user with duplicate email 
        - Não deve inserir um novo usuário com e-mail duplicado
### 2. Find
    2.1 Shouldn't get a user with invalid id  
        - Não deve receber um usuário com id inválido
    2.2 Should get a user with id  
        - Deve obter um usuário com id
### 3. Update
    3.1 Shouldn't update a user with invalid or null id  
        - Não deve atualizar um usuário com id inválido ou nulo
    3.2 Shouldn't update a user if it doesn't have all required fields  
        - Não deve atualizar um usuário se ele não tiver todos os campos obrigatórios
    3.3 Should update a user
        - Deve atualizar um usuário
### 4. Remove
    4.1 Shouldn't remove a user with invalid or null id  
        - Não deve remover um usuário com id inválido ou nulo
    4.2 Should remove a user
        - Deve remover um usuário

***
### Teste de API
*Testes realizados nas rotas registradas na API*
  
### 1. Get 
>*[get] /Api/Paper*
***
    1.1 It must be possible to list all users  
        - Deve ser possível listar todos os usuários
    1.2 It must return status 201  
        - Deve retornar status "201"
    1.3 It should not be possible to list users with invalid filters  
        - Não deve ser possível listar usuários com filtros inválidos
    1.4 It should be possible to list filter users  
        - Deve ser possível listar usuários com filtro


### 2. GetID
>*[get] /Api/Paper/:Id*  
***
    1.2 Shouldn't get a user with invalid id  
        - Não deve receber um usuário com id inválido
    1.3 Should get a user with id  
        - Deve obter um usuário com id

### 2. Create
>*[post] /Api/Paper*
***
    2.1 Shouldn't not enter a new user if it does not have all required fields  
        - Não deve inserir um novo usuário se ele não tiver todos os campos obrigatórios  
    2.2 Should insert a new user  
        - Deve inserir um novo usuário
    2.3 Should insert a new user  
        - Não deve inserir um novo usuário com e-mail duplicado
### 3. Update
>*[put] /Api/Paper/:Id*
***
    3.1 Shouldn't update a user with invalid or null id  
        - Não deve atualizar um usuário com id inválido ou nulo
    3.2 Shouldn't update a user if it doesn't have all required fields  
        - Não deve atualizar um usuário se ele não tiver todos os campos obrigatórios
    3.3 Should update a user
        - Deve atualizar um usuário
### 4. Remove
>*[delete] /Api/Paper/:Id*
***
    4.1 Shouldn't remove a user with invalid or null id  
        - Não deve remover um usuário com id inválido ou nulo
    4.2 Should remove a user
        - Deve remover um usuário

***