//CRIANDO CONTEÚDO DA TABELA TAGS:

exports.up = knex => knex.schema.createTable("tags", table => { //criando a tabela NOTES
    table.increments("id");
    table.text("name").notNullable();//notNullable não permite nulo
  
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");//Se deletar ua nota, deleta tudo que esta associada a ela, como as tags.
  
    table.integer("user_id").references("id").inTable("users"); //faz referencia ao ID dentro da tabela USERS
  });
  
  /*COMO EXECUTAR KNEX(migration) DENTRO DO BANCO DE DADOS:
  => Adiciona um script em package.json:
      "migrate": "knex migrate:latest"
  => Digita no terminal:
      npm run migrate
  */
  
  
  
  exports.down = knex => knex.schema.dropTable("tags"); //para excluir tabela
  