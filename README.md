# API de autenticação utilizando JWT

## Teste para o projeto da SKY

### Stack utilizada

* NodeJs
* Express
* Mongodb

### Disponível em:

> https://teste-sky-lucas.herokuapp.com

### Rotas

#### Criação de usuário

>POST EM https://teste-sky-lucas.herokuapp.com/users

Exemplo:

```json
{
    "nome":"Exemplo",
    "email": "exemplo@exemplo.com",
    "senha": "123456",
    "telefones": [
        {
            "ddd":"11",
            "numero":"99999999"
        },
        {
            "ddd":"11",
            "numero":"999999999"
        }
    ]
}
```

#### Sign In

>POST EM https://teste-sky-lucas.herokuapp.com/users/signin

Exemplo:

```json
{
    "email":"exemplo@exemplo.com",
    "senha":"123456"
}
```

Após o login a API retornará o um json com a representação do usuário contendo o **_id** e o **token** jwt. Essas informações serão necessárias para acessar a rota de listagem de usuários.

#### Listagem de usuários

>GET EM https://teste-sky-lucas.herokuapp.com/users/{ _id }

* O acesso dessa rota é permitido apenas pra quem realizou login e possui um token válido.
* Usuários deverão ter feito login a menos de 30 minutos para acessar essa rota.
* O _id do usuário deverá ser fornecido na rota /users/_id.
* O token deve ser passado no header da requisição com o nome "authorization".

Caso passe nas validações o usuário deve receber a listagem de todos usuários cadastrados no banco.



