
const { Repository } = require('../repository/genericRepository');

async function cadastrar(name) {
  try {
    const insertScript = `INSERT INTO people (name) value ('${name}')`;
    const results = await Repository.query(insertScript);
    console.log(`Pessoa cadastrada com sucesso. ${JSON.stringify({ affectedRows: results.affectedRows })}`);
    return results;
  } catch (error) {
    const errorMgs = `Falha ao inserir pessoa: ${error.message}`;
    console.log(errorMgs);
    throw new Error(errorMgs);
  }
}

async function buscarTodos() {
  try {
    const searchScript = 'SELECT * FROM people';
    const results = await Repository.query(searchScript);
    console.log(`Busca de pessoas finalizada com sucesso. ${JSON.stringify({ total_pessoas: results.length })}`);
    return results;
  } catch (error) {
    const errorMgs = `Falha ao consultar pessoa: ${error.message}`;
    console.log(errorMgs);
    throw new Error(errorMgs);
  }
}

const PessoaGateway = {
  cadastrar,
  buscarTodos
};

module.exports = {
  PessoaGateway,
};
