//ARQUIVO RESPONSÁVEL POR GUARDAR AS ROTAS DE USUÁRIO

const { Router } = require ("express")

const UsersController = require("../controllers/UsersController")

const usersRoutes = Router()

const usersController = new UsersController()


usersRoutes.post ("/", usersController.create)
usersRoutes.put('/:id', usersController.update)

module.exports = usersRoutes; //exportando para quem quiser utilizar esse arquivo