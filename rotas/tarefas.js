const Router = require("express").Router();
const repositorio = require("../repositorios/tarefas").repositorioTarefas();


Router.get("/tarefas", (req, res) => {
    const tarefas = repositorio.getAll();
    res.send(tarefas);
});

Router.get("/tarefas/:id", (req, res) => {
    try {
        const { id } = req.params;
        const tarefa = repositorio.get(Number(id));
        res.send(tarefa);
    } catch (err) {
        const dadosDoErro = JSON.parse(err.message);
        res.status(dadosDoErro.status).send(dadosDoErro.mensagem);
    }
});

Router.post("/tarefas", (req, res) => {
    try {
        const dados = req.body;

        const tarefaCadastrada = repositorio.create(dados);

        res.send(tarefaCadastrada);
    } catch (err) {
        const dadosDoErro = JSON.parse(err.message);
        res.status(dadosDoErro.status).send(dadosDoErro.mensagem);
    }
});

Router.put("/tarefas/:id", (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body;

        const tarefaAtualizada = repositorio.update(dados, Number(id));

        res.send(tarefaAtualizada);
    } catch (err) {
        const dadosDoErro = JSON.parse(err.message);
        res.status(dadosDoErro.status).send(dadosDoErro.mensagem);
    }
});

Router.patch("/tarefas/:id", (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body;

        const tarefaAtualizada = repositorio.patch(dados, Number(id));

        res.send(tarefaAtualizada);
    } catch (err) {
        const dadosDoErro = JSON.parse(err.message);
        res.status(dadosDoErro.status).send(dadosDoErro.mensagem);
    }
});

Router.delete("/tarefas/:id", (req, res) => {
    try {
        const { id } = req.params;
        repositorio.destroy(Number(id));

        res.status(204).send();
    } catch (err) {
        const dadosDoErro = JSON.parse(err.message);
        res.status(dadosDoErro.status).send(dadosDoErro.mensagem);
    }
});

module.exports = Router;
