//ARQUIVO RESPONSÁVEL POR GUARDAR AS TAGS DE USUÁRIO

const { Router } = require ("express")

const TagsController = require("../controllers/TagsController")

const tagsRoutes = Router()

const tagsController = new TagsController()

tagsRoutes.get ("/:user_id", tagsController.index)


module.exports = tagsRoutes; //exportando para quem quiser utilizar esse arquivo