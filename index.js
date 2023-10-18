require('dotenv').config()

const express = require('express')
const rotasPadrao = require('./rotas/index.js')
const rotasTarefas = require('./rotas/tarefas.js')

const app = express()

app.use(express.json())
app.use(rotasPadrao)
app.use(rotasTarefas)


app.listen(process.env.PORTA, () => {
    console.log("API rodando")
})