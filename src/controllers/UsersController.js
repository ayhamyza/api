//O controller vai lidar com o processamento e fazer a resposta da requisição

/*
PQ UTILIZAR UMA CLASSE?
Dentro de uma classe podemos criar e excutar VÁRIAS funções.

O ideal é que uma classe tenha dentro dela no MÁXIMO cinco funções
sendo elas:

     * index - GET para listar vários registros.
     * show - GET para exibir um registro específico.
     * create - POST para criar um registro.
     * update - PUT para atualizar um registro.
     * delete - DELETE para remover um registro.

Caso ultrapasse cinco funções em uma classe o ideal é criar um outro controller para abriga-las.

Nada impede que um Controller tenha somente uma classe, ou duas, etc.

*/ 
/*----------------------------------------------------
BAIXAR BIBLIOTECA EXPRESS ASYNC ERROR (para tratamento de exceções)
    *npm install express-async-errors --save
    *importar em server.js
*/

const { hash, compare } = require('bcryptjs') //(hash: função para criptografar a senha)
const AppError = require('../utils/AppError') //Importando excessão (função de erro)
const sqliteConnection = require('../database/sqlite') 

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const database = await sqliteConnection() //sqlConnection(conexão com banco de dados)
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]) //Selecionar tudo DE tabela users ONDE? no email= substitui ? pelo email do usuario

    //database.get (buscar no banco de dados)
  
    if (checkUserExists){
      throw new AppError("Este e-mail já está em uso.")
      /*A declaração throw lança uma exceção definida pelo usuário. A execução da função atual vai parar (as instruções após o throw não serão executadas), e o controle será passado para o primeiro bloco catch na pilha de chamadas. Se nenhum bloco catch existe entre as funções "chamadoras", o programa vai terminar.*/
    }

    const hashedPassword = await hash(password, 8) //criptografando senha

    await database.run(
      /*A expressão await faz a execução de uma função async pausar, para esperar pelo retorno da Promise , e resume a execução da função async quando o valor da Promise é resolvido. Ele então retorna o valor final da Promise. Se esse valor não for uma Promise , ele é convertido para uma Promise resolvida.
      */
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    )

    return response.status(201).json()
  }


  /* => No insomnia cria uma nova requisição chamada Update do tipo PUT(atualização)
     => No corpo da requisição seleciona JSON
     => No corpo da requisição coloca dados que deseja atualizar
     EXEMPLO:
          {"name": "Novo Nome",
            "email": "Novo email"} */

  async update(request, response) { //FUNÇÃO ASSINCRONA PARA ATUALIZAÇÃO DE DADOS, TRATAMENTO DE EXCEÇÃO
     const { name, email, password, old_password } = request.body
     const { id } = request.params

     const database = await sqliteConnection() //sqlConnection(conexão com banco de dados)
     const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])//user - ID

     if(!user) { //se usuário não existir dentro do banco de dados executar uma exceção
      throw new AppError("Usuário não encontrado") //exceção
     }

     const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])//userWithUpdatedEmail = email

     if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {//se o id cadastrado no email for diferente do id do usuario apresentar uma excessão
      throw new AppError("Este e-mail já está em uso.")//excessão
     }

     user.name = name ?? user.name //caso tudo de certo (ñ tenha erro) adicionar novo name a user.name
     user.email= email ?? user.email //caso tudo de certo (ñ tenha erro) adicionar novo name a user.name

     if(password && !old_password) { //se senha antiga não for informada apresentar uma excessão
      throw new AppError("Você informar a senha antiga para definir a nova senha") //excessão
     }

     if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if(!checkOldPassword) {
        throw new AppError("A senha antiga não confere.")
      }

      user.password = await hash(password, 8) //caso não aponte nenhum erro, a senha digitada pelo usuario sera cadrastrada em user.password e criptografada na tabela users
     }


     //Adicionando novos dados na tabela:
     await database.run(` 
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`, 
      [user.name, user.email, user.password, id]
    )

    return response.json()
  }
}

module.exports = UsersController