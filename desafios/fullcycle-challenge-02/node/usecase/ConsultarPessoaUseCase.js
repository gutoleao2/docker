const { PessoaGateway } = require('../gateway/PessoaGateway');

async function execute() {
  try {
    console.log('Consultando pessoas');
    return await PessoaGateway.buscarTodos();
  } catch (error) {
    console.log(JSON.stringify({ error }));
    throw new Error(error.message);
  }
}

const ConsultarPessoaUseCase = {
  execute
};

module.exports = {
  ConsultarPessoaUseCase,
};
