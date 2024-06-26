//PRIMEIRO ARQUIVO A SER CRIADO APOS INSTALAR EXPRESS -  RESPONSÁVEL POR INICIALIZAR A APLICAÇÃO
//Quando clicar no SEND é direcionado para o arquivo server.js

require("express-async-errors")

const migrationsRun = require ("./database/sqlite/migrations")

migrationsRun()

const AppError = require("./utils/AppError")
const uploadConfig = require("./configs/upload")

const express = require ("express"); //importando express

const routes = require("./routes")


const app = express(); //inicializando 
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes) //quando entra no arquivo atual é redirecionado para routes em index.js.

app.use((error, request, response, next) => {
    if (error instanceof AppError) { //Se for erro do cliente
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      })
    }
  
    console.error(error)
  
    return response.status(500).json({ //Se for erro interno
      status: 'error',
      message: 'Internal server error'
    })
  })

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));