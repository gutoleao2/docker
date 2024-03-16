const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

const configDb = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const connection = mysql.createConnection(configDb);

const sql = `INSERT INTO people(name) values('Guto')`;
connection.query(sql);
connection.end();

app.post('')

app.get('/hello', (req, res) => {
    res.send('<h1>Hello World</h1>');
})

app.listen(port, () => console.log('Rodando na porta ' + port))