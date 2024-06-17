const { response } = require("express")
const knex = require("../database/knex")

class NotesController {
    async create(request, response) { //CRIANDO NOTAS
        const {title, description, tags, links} = request.body
        const  user_id  = request.user.id;

        const [note_id] = await knex ("notes").insert({
            title,
            description,
            user_id
        })

        const linksInsert = links.map(link => {
            return {
                note_id,
                url: link
            }
        })

        await knex("links").insert(linksInsert)

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        })

        await knex("tags").insert(tagsInsert)

       return response.json()
    }

    async show(request, response) { //VISUALIZANDO NOTAS
        const { id } = request.params

        const note = await knex("notes").where({ id }).first()
        const tags = await knex("tags").where({ note_id: id }).orderBy("name")
        const links = await knex ("links").where({ note_id: id }).orderBy("created_at")

        return response.json({
            ...note,
            tags,
            links
        })
    }

    async delete (request, response) { //DELETANDO NOTAS
        const { id } = request.params

        await knex ("notes").where({ id }).delete()

        return response.json()
    }

    async index (request, response) { //listar notas
        const { title, tags } = request.query

        const user_id = request.user.id;

        let notes

        if(tags) { //exibir tags, pesquisando pelo Query.
            const filterTags = tags.split(',').map(tag => tag.trim()) //Permite pesquisar mais de uma tag, separando por vírgula.

            notes = await knex ("tags")
                .select ([
                    //selecionando campos da tabela notes:
                    "notes.id",
                    "notes.title",
                    "notes.user_id",
                ])
                .where("notes.user_id", user_id)
                .whereLike("notes.title", `%${title}%`)
                .whereIn("name", filterTags)
                .innerJoin("notes", "notes.id", "tags.note_id")
                .orderBy("notes.title")

        } else{ //SENÃO existir uma tag, exibe a nota.
        notes = await knex ("notes")
            .where ({ user_id })
            .whereLike("title", `%${title}%`)
            /*.whereLike -> Serve para pesquisar a nota pelo nome(title).
            `%$(title)%`-> O porcentual envolvendo a variavel, faz com que não seja necessario digitar TODO o title, se digitar uma palavra que exista dentro do title, ele ja encontra.

             */
            .orderBy("title")
        }
        const userTags = await knex ("tags").where({  user_id })
        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id)
            return {
                ...note,
                tags:noteTags
            }
        })
        return response.json(notesWithTags);
    }
}

module.exports = NotesController