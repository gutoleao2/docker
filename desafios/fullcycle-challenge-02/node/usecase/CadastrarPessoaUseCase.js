const { PessoaGateway } = require('../gateway/PessoaGateway');

async function execute(name) {
    try {
        console.log('Criando pessoa');
        const results = await PessoaGateway.cadastrar(name);
        return results;
    } catch (error) {
        console.log(JSON.stringify({ error }));
        throw new Error(error.message);
    }
}

const CadastrarPessoaUseCase = {
    execute
};

module.exports = {
    CadastrarPessoaUseCase,
};
