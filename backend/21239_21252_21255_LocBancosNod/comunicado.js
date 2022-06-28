class Comunicado
{
    #cep
    #mensagem
    #descricao

    constructor (cep, mensagem, descricao)
    {
        this.cep=cep;
        this.mensagem=mensagem;
        this.descricao=descricao;
    }

    get cep ()
    {
        return this.#cep
    }

    get mensagem ()
    {
        return this.#mensagem
    }

    get descricao ()
    {
        return this.#descricao
    }

    set cep (cep)
    {
        if (cep===undefined || typeof cep !== 'string' || cep.length!==3)
            throw ('CEP inválido');

        this.#cep = cep;
    }

    set mensagem (mensagem)
    {
        if (mensagem===undefined || typeof mensagem !== 'string' || mensagem==="")
            throw ('Mensagem inválida');

        this.#mensagem = mensagem;
    }

    set descricao (descricao)
    {
        if (descricao===undefined || typeof descricao !== 'string' || descricao==="")
            throw ('Descrição inválida');

        this.#descricao = descricao;
    }

    get object ()
    {
        return {cep:this.#cep,mensagem:this.#mensagem,descricao:this.#descricao};
    }
}

function novo (cep,mensagem,descricao)
{
    return new Comunicado (cep,mensagem,descricao);
}

module.exports = {novo}
