const knex = require("../database/knex")

class TagsController {
    async index (request, response){ //Função index é responsavel por listar todas as Tags DO USUÁRIO.
        const  user_id  = request.user.id; //buscando user_id 

        const tags = await knex("tags")
          .where({ user_id })

        return response.json(tags)
    }
}

module.exports = TagsController