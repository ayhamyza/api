//ARQUIVO RESPONSÁVEL POR GUARDAR AS TAGS DE USUÁRIO

const { Router } = require ("express")

const TagsController = require("../controllers/TagsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const tagsRoutes = Router()

const tagsController = new TagsController()

tagsRoutes.get ("/", ensureAuthenticated , tagsController.index)


module.exports = tagsRoutes; //exportando para quem quiser utilizar esse arquivo