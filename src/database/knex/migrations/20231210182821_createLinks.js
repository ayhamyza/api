//CRIANDO CONTEÚDO DA TABELA LINKS

exports.up = knex => knex.schema.createTable("links", table => { //criando a tabela NOTES
    table.increments("id");
    table.text("url").notNullable();
  
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");//Se deletar ua nota, deleta tudo que esta associada a ela, como as tags.
    table.timestamp("created_at").default(knex.fn.now());//captura momento de criação
  });
  
  /*COMO EXECUTAR KNEX(migration) DENTRO DO BANCO DE DADOS:
  => Adiciona um script em package.json:
      "migrate": "knex migrate:latest"
  => Digita no terminal:
      npm run migrate
  */
  
  
  
  exports.down = knex => knex.schema.dropTable("links"); //para excluir tabela
  
