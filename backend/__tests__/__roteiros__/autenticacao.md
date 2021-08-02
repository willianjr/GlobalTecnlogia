# ROTEIRO DE TESTES - Autenticação
> [[Voltar]](__index.md) 
***
>Esse roteiro orienta a sequência e quais testes devem ser realizados

---

## **Autenticação**

### Teste de API
*Testes realizados nas rotas registradas na API*
  
### 1. Get 
>*[get] /Api/Login*
***
    1.1 It must be possible to list all users  
        - Deve ser possível listar todos os papais
    1.2 It must return status 201  
        - Deve retornar status "201"
    1.3 It should not be possible to list papers with invalid filters  
        - Não deve ser possível listar papeis com filtros inválidos
    1.4 It should be possible to list filter papers  
        - Deve ser possível listar papeis com filtro


### 2. GetID
>*[get] /Api/Login/:Id*  
***
    1.2 Shouldn't get a paper with invalid id  
        - Não deve receber um papel com id inválido
    1.3 Should get a paper with id  
        - Deve obter um papel com id