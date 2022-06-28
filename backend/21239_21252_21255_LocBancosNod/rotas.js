const bancos     = require ('./bancos.js');
const Banco      = require ('./banco.js');
const Comunicado = require ('./comunicado.js');


// para a rota de CREATE
async function inclusao (req, res)
{
    console.log(req.body)
    if (Object.values(req.body).length!=7 || !req.body.numeroDeRegistro || !req.body.nome || !req.body.cep || !req.body.numero || !req.body.complemento || !req.body.funcionarios || !req.body.clientes)
    {
        console.log(req.body.numeroDeRegistro,req.body.nome,req.body.cep,req.body.numero,req.body.complemento,req.body.funcionarios,req.body.clientes);
        const erro = Comunicado.novo('DdI','Dados inesperados','Não foram fornecidos exatamente as 7 informações esperadas de um banco (numeroDeRegistro, nome, cep, numero, complemento, funcionarios, clientes)').object;
        return res.status(422).json(erro);
    }
    
    let banco;
    try
    {
        banco = Banco.novo (req.body.numeroDeRegistro,req.body.nome,req.body.cep,req.body.numero,req.body.complemento,req.body.funcionarios,req.body.clientes);
    }
    catch (excecao)
    {
        const erro = Comunicado.novo('TDE','Dados de tipos errados','Numero De Resgistro deve ser um numero natural positivo, nome deve ser um texto não vazio, cep deve ter 8 caracteres, Número deve deve ser um número inteiro positivo, Complemento deve ser um texto, Funcionarios deve ser um número inteiro positivo, Clientes devem ser um número inteiro positivo').object;
        return res.status(422).json(erro);
    }

    const ret = await bancos.inclua(banco);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('LJE','banco já existe','Já há banco cadastrado com o código informado').object;
        return res.status(409).json(erro);
    }

  //if (ret===true)
  //{
        const  sucesso = Comunicado.novo('IBS','Inclusão bem sucedida','O banco foi incluído com sucesso').object;
        return res.status(201).json(sucesso);
  //}
}

// para a rota de UPDATE
async function atualizacao (req, res)
{
    if (Object.values(req.body).length!=7 || !req.body.numeroDeRegistro || !req.body.nome || !req.body.cep || !req.body.numero || !req.body.complemento || !req.body.funcionarios || !req.body.clientes)
    {
        const erro = Comunicado.novo('DdI','Dados inesperados','Não foram fornecidos exatamente as  informações esperadas de um banco (numero de registro atual, novo nome, novo cep, novo numero, novo complemento, novos funcionarios e novos clientes)').object;
        return res.status(422).json(erro);
    }
    
    let banco;
    try
    {
        banco = Banco.novo (req.body.numeroDeRegistro,req.body.nome,req.body.cep,req.body.numero,req.body.complemento,req.body.funcionarios,req.body.clientes);
    }
    catch (excecao)
    {
        console.log(excecao)
        const erro = Comunicado.novo('TDE','Dados de tipos errados','Numero De Resgistro deve ser um numero natural positivo, nome deve ser um texto não vazio, cep deve ter 11 caracteres, Número deve deve ser um número inteiro positivo, Complemento deve ser um texto, Funcionarios deve ser um número inteiro positivo, Clientes devem ser um número inteiro positivo').object;
        return res.status(422).json(erro);
    }

    const cep = req.params.cep;
    
    if (cep!=banco.cep)
    {
        const erro = Comunicado.novo('TMC','Mudança de cep','Tentativa de mudar o cep do banco').object;
        return res.status(400).json(erro);    
    }
    
    let ret = await bancos.recupereUm(cep);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

    if (ret.length==0)
    {
        const erro = Comunicado.novo('LNE','banco inexistente','Não há banco cadastrado com o cep informado').object;
        return res.status(404).json(erro);
    }

    ret = await bancos.atualize(banco);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

  //if (ret===true)
  //{
        const sucesso = Comunicado.novo('ABS','Alteração bem sucedida','O banco foi atualizado com sucesso').object;
        return res.status(201).json(sucesso);
  //}
}

// para a rota de DELETE
async function remocao (req, res)
{
    if (Object.values(req.body).length!=0)
    {
        const erro = Comunicado.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados sem necessidade no corpo da requisição').object;
        return res.status(422).json(erro);
    }
    
    const cep = req.params.cep;
    let ret = await bancos.recupereUm(cep);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

    if (ret.length==0)
    {
        const erro = Comunicado.novo('LNE','banco inexistente','Não há banco cadastrado com o cep informado').object;
        return res.status(404).json(erro);
    }

    ret = await bancos.remova(cep);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

  //if (ret===true)
  //{
        const sucesso = Comunicado.novo('RBS','Remoção bem sucedida','O banco foi removido com sucesso').object;
        return res.status(200).json(sucesso);
  //}    
}

// para a segunda rota de READ (um)
async function recuperacaoDeUm (req, res)
{
    console.log(req.params)

    if (Object.values(req.body).length!=0)
    {
        const erro = Comunicado.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados sem necessidade no corpo da requisição').object;
        return res.status(422).json(erro);
    }

    const cep = req.params.cep;

    const ret = await bancos.recupereUm(cep);

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

    if (ret.length==0)
    {
        const erro = Comunicado.novo('LNE','banco inexistente','Não há banco cadastrado com o código informado').object;
        return res.status(404).json(erro);
    }

    return res.status(200).json(ret);
}

// para a primeira rota de READ (todos)
async function recuperacaoDeTodos (req, res)
{
    if (Object.values(req.body).length!=0)
    {
        const erro = Comunicado.novo('DSP','Fornecimento de dados sem propósito','Foram fornecidos dados sem necessidade no corpo da requisição').object;
        return res.status(422).json(erro);
    }

    const ret = await bancos.recupereTodos();

    if (ret===null)
    {
        const  erro = Comunicado.novo('CBD','Sem conexão com o BD','Não foi possível estabelecer conexão com o banco de dados').object;
        return res.status(500).json(erro);
    }

    if (ret===false)
    {
        const  erro = Comunicado.novo('FNC','Falha no comando SQL','O comando SQL apresenta algum erro').object;
        return res.status(409).json(erro);
    }

    return res.status(200).json(ret);
}

module.exports = {inclusao, atualizacao, remocao, recuperacaoDeUm, recuperacaoDeTodos}