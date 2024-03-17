const db = require("../models");
const Pessoa = db.pessoa;
const Op = db.Sequelize.Op;

async function cadastrar(name) {
  const pessoa = {
    name: name
  };

  try {
    return await Pessoa.create(pessoa);
  } catch (err) {
    throw new Error(err.message || "Falha na criação de pessoa")
  }
}

async function buscarTodos() {
  try {
    return await Pessoa.findAll();
  } catch (err) {
    throw new Error(err.message || "Falha na busca de pessoas")
  }

};

const PessoaGateway = {
  cadastrar,
  buscarTodos,
};

module.exports = {
  PessoaGateway,
};
