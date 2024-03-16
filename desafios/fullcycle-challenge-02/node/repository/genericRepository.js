const mysql = require('mysql2');
const util = require('util');

const config = {
  connectionLimit: 10,
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};

const pool = mysql.createPool(config);
const queryAsync = util.promisify(pool.query).bind(pool);

async function query(sql) {
  try {
    const results = await queryAsync(sql);
    return results;
  } catch (error) {
    throw new Error(`Erro na consulta: ${error.message}`);
  }
}

async function createTableIfNotExists() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS people (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL
    )
  `;

  try {
    await query(createTableSQL);
    console.log('Tabela "people" criada ou já existente.');
  } catch (error) {
    console.error('Erro ao criar a tabela:', error);
  }
}

const Repository = {
  query,
  createTableIfNotExists,
};

module.exports = {
  Repository,
};
