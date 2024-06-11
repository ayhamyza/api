//ARQUIVO RESPONSAVEL POR REUNIR TODOS OS GRUPOS DE ROTAS DA APLICAÇÃO
const {Router} = require("express")

const usersRouter = require("./users.routes")
const notesRouter = require("./notes.routes")
const tagsRouter = require("./tags.routes")
const sessionsRouter = require("./sessions.routes");

const routes = Router()

routes.use ("/users", usersRouter); //TODA VEZ QUE O /users FOR ACESSADO SERA REDIRECIONADO PARA users.routes.js
routes.use("/sessions" , sessionsRouter);
routes.use ("/notes", notesRouter);
routes.use ("/tags", tagsRouter);


module.exports = routes; // exporta todos os grupos de rotas da aplicação