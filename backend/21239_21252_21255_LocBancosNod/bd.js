require('dotenv').config()

const {Client} = require('pg');



async function getConexao()
{
    if(global.conexao && global.conexao.state !== 'disconnected')
        return global.conexao;
    try
    {
        const cliente = new Client({
            connectionString : process.env.HEROKU_DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        
        });
        
        cliente.connect()
        global.conexao = cliente;

        return cliente;
    }
    catch(erro)
    {
        return null;
    }
}

async function estrutuSe()
{
    const conexao = await getConexao();

    if(conexao == undefined) // se a conexão é indefinida
        return null;

    const sql = 'CREATE TABLE IF NOT EXISTS Banco2 ("numeroDeRegistro" TINYINT UNSIGNED, nome VARCHAR(50) NOT NULL, cep VARCHAR(20) NOT NULL, numero INTEGER NOT NULL, complento VARCHAR(50) NOT NULL, funcionarios INTEGER NOT NULL, clientes INTEGER NOT NULL, PRIMARY KEY(numeroDeRegistro))';

    try
    {
        await conexao.query(sql);
    }
    catch(erro)
    {
        return false;
    }
}

module.exports = {getConexao, estrutuSe}