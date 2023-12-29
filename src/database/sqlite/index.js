
//Se conectando com o banco  de dados:

const sqlite3 = require("sqlite3"); //importando sqlite3
const sqlite = require("sqlite");//importando sqlite
const path = require("path");//biblioteca própria do NODE,serve para rodar a pasta normalmente em outros sistemas(se adapta) 



async function sqliteConnection(){
    const database = await sqlite.open ({
        filename: path.resolve(__dirname, "..", "database.db"),
        /*filename: propriedade para dizer onde o arquivo ficará salvo
          __dirname: define a pasta em que esta no momento (index.js)
          "..": volta uma pasta(database) e cria o arquivo database.db dentro dela*/
        
        driver: sqlite3.Database //qual é o drive de conexão
    });

    return database;
}

module.exports = sqliteConnection;//exportando

//UTILIZA CONEXÃO COM BANCO DE DADOS NO server.js

//Para conseguir vizualizar o que tem dentro da pasta de banco de dados utilizamos o SGBD(sistema gerenciador de banco de dados) => ferramenta utlizada (Beekeeper Studio:é um editor e gerenciador SQL de banco de dados multiplataforma)