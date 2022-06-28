const bd = require ('./bd');

async function inclua (banco)
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql     = `INSERT INTO Banco2 ("numeroDeRegistro",nome,cep,numero,complemento,funcionarios,clientes) VALUES (${banco.numeroDeRegistro},'${banco.nome}','${banco.cep}',${banco.numero},'${banco.complemento}',${banco.funcionarios},${banco.clientes})`;
        await conexao.query (sql);
        return true;
    }
    catch (excecao)
    {
        console.log(excecao)
        return false;
    }
}

async function atualize (banco)
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql   = 'UPDATE Banco2 SET nome=$1,numero=$2,complemento=$3,funcionarios=$4,clientes=$5 WHERE cep =$6';
        const dados = [banco.nome,banco.numero,banco.complemento,banco.funcionarios,banco.clientes,banco.cep];
        await conexao.query (sql,dados);
        return true;
    }
    catch (excecao)
    {
        console.log(excecao)
        return false;
    }
}
    
async function remova (cep)
{
    const conexao = await bd.getConexao ();
    if (conexao==null) return null;

    try
    {
        const sql   = `DELETE FROM Banco2 WHERE cep='${cep}'`;
        await conexao.query (sql);
        return true;
    }
    catch (excecao)
    {
        return false;
    }
}

async function recupereUm (cep)
{
    const conexao = await bd.getConexao();
    if (conexao==null) return null;

    try
    {
        console.log(cep)
        const  sql     = `SELECT * FROM Banco2 WHERE cep='${cep}'`;
        const linhas = (await conexao.query(sql)).rows;

        return linhas[0];
    }
    catch (excecao)
    {
        console.log(excecao)
        return false;
    }
}

async function recupereTodos ()
{
    const conexao = await bd.getConexao();
    if (conexao==null) return null;

    try
    {
        const  sql     = 'SELECT * FROM Banco2';
        // const [linhas] = await conexao.query(sql);
        const linhas = (await conexao.query(sql)).rows;

        return linhas;
    }
    catch (excecao)
    {
        return false;
    }
}

module.exports = {inclua, atualize, remova, recupereUm, recupereTodos}



