let tarefas = [
    {
        id: 1,
        nome: "Tarefa 1",
        descricao: "Descrição da Tarefa 1",
        status: "FEITO"
    },
    {
        id: 2,
        nome: "Tarefa 2",
        descricao: "Descrição da Tarefa 2",
        status: "A FAZER"
    }
];

let ultimo_id = 2; // ID da última tarefa

const validar = require("../validacoes/tarefas");

const repositorioTarefas = () => {
    return {
        getAll: () => {
            return tarefas;
        },

        get: (id) => {
            const tarefa = tarefas.find(t => t.id === id);
            if (!tarefa) {
                throw new Error(JSON.stringify({
                    status: 404,
                    mensagem: "Tarefa não encontrada."
                }));
            }
            return tarefa;
        },

        create: (dados) => {
            if (!validar(dados.status)) {
                throw new Error(JSON.stringify({
                    status: 400,
                    mensagem: "Status inválido."
                }));
            }

            const tarefa = {
                id: ++ultimo_id,
                nome: dados.nome,
                descricao: dados.descricao,
                status: dados.status
            };
            tarefas.push(tarefa);
            return tarefa;
        },

        update: (dados, id) => {
            if (!validar(dados.status)) {
                throw new Error(JSON.stringify({
                    status: 400,
                    mensagem: "Status inválido."
                }));
            }

            const tarefa = tarefas.find(t => t.id === id);
            if (!tarefa) {
                throw new Error(JSON.stringify({
                    status: 404,
                    mensagem: "Tarefa não encontrada."
                }));
            }

            tarefa.nome = dados.nome;
            tarefa.descricao = dados.descricao;
            tarefa.status = dados.status;

            return tarefa;
        },

        patch: (dados, id) => {
            const tarefa = tarefas.find(t => t.id === id);
            if (!tarefa) {
                throw new Error(JSON.stringify({
                    status: 404,
                    mensagem: "Tarefa não encontrada."
                }));
            }

            if (dados.nome !== undefined) {
                tarefa.nome = dados.nome;
            }

            if (dados.descricao !== undefined) {
                tarefa.descricao = dados.descricao;
            }

            if (dados.status !== undefined) {
                if (!validar(dados.status)) {
                    throw new Error(JSON.stringify({
                        status: 400,
                        mensagem: "Status inválido."
                    }));
                }
                tarefa.status = dados.status;
            }

            return tarefa;
        },

        destroy: (id) => {
            const index = tarefas.findIndex(t => t.id === id);
            if (index === -1) {
                throw new Error(JSON.stringify({
                    status: 404,
                    mensagem: "Tarefa não encontrada."
                }));
            }
            tarefas.splice(index, 1);
        }
    };
};

module.exports = {
    repositorioTarefas: repositorioTarefas
};
