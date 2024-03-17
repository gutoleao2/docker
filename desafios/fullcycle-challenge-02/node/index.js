const express = require('express');
const bodyParser = require('body-parser');
const { CadastrarPessoaUseCase } = require('./usecase/CadastrarPessoaUseCase');
const { ConsultarPessoaUseCase } = require('./usecase/ConsultarPessoaUseCase');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = require("./models");

(async () => {
    await db.sequelize.sync();
    console.log('Database synced!');
})();

app.get('/', async (req, res) => {
    try {
        await CadastrarPessoaUseCase.execute('People' + ' ' + Date.now());
        const peopleList = await ConsultarPessoaUseCase.execute();

        const title = '<h1>Full Cycle Rocks!</h1>';
        const list = `<ul>${peopleList.map(p => `<li>${p.name}</li>`).join('')}</ul>`;
        
        console.log(`Consulta finalizada com sucesso`);
        res.status(200).send(title.concat(list));
    } catch (error) {
        console.error('Falha de processamento:', error);
        res.status(500).json({ error: 'Falha de processamento' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
