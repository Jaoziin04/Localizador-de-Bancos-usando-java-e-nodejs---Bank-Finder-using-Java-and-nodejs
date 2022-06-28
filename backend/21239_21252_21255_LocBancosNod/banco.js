class Banco
{
    #numeroDeRegistro
    #nome
    #cep
    #numero
    #complemento
    #funcionarios
    #clientes

    constructor (numeroDeRegistro, nome, cep, numero, complemento, funcionarios, clientes)
    {
        this.numeroDeRegistro=numeroDeRegistro;
        this.nome=nome;
        this.cep=cep;
        this.numero = numero;
        this.complemento = complemento
        this.funcionarios = funcionarios;
        this.clientes = clientes;
    }

    get numeroDeRegistro ()
    {
        return this.#numeroDeRegistro
    }

    get nome ()
    {
        return this.#nome
    }

    get cep ()
    {
        return this.#cep
    }

    get numero ()
    {
        return this.#numero
    }

    get complemento ()
    {
        return this.#complemento
    }

    get funcionarios()
    {
        return this.#funcionarios
    }

    get clientes()
    {
        return this.#clientes
    }

    set numeroDeRegistro (numeroDeRegistro)
    {
        if (numeroDeRegistro===undefined || typeof numeroDeRegistro !== 'number' || isNaN(numeroDeRegistro) || numeroDeRegistro!==parseInt(numeroDeRegistro) || numeroDeRegistro<=0)
            throw ('Código inválido');

        this.#numeroDeRegistro = numeroDeRegistro;
    }

    set nome (nome)
    {
        if (nome===undefined || typeof nome !== 'string' || nome==="")
            throw ('Nome inválido');

        this.#nome = nome;
    }

    set cep (cep)
    {
        if (cep===undefined || typeof cep !== 'string' || cep == "")
            throw ('cep inválido');

        this.#cep = cep;
    }

    set numero (numero)
    {
        if (numero===undefined || typeof numero !== 'number' || isNaN(numero) || numero!==parseInt(numero) || numero<=0)
            throw ('Código inválido');

        this.#numero = numero;
    }

    set complemento (complemento)
    {
        if (complemento===undefined || typeof complemento !== 'string' || complemento == "")
            throw ('cep inválido');

        this.#complemento = complemento;
    }

    
    set funcionarios (funcionarios)
    {
        if (funcionarios===undefined || typeof funcionarios !== 'number' || isNaN(funcionarios) || funcionarios!==parseInt(funcionarios) || funcionarios<=0)
            throw ('Funcionarios inválidos');

        this.#funcionarios = funcionarios;
    }

    
    set clientes (clientes)
    {
        if (clientes===undefined || typeof clientes !== 'number' || isNaN(clientes) || clientes!==parseInt(clientes) || clientes<=0)
            throw ('Clientes inválidos');

        this.#clientes = clientes;
    }
}

function novo (numeroDeRegistro,nome,cep,numero,complemento,funcionarios,clientes)
{
    return new Banco (numeroDeRegistro,nome,cep,numero,complemento,funcionarios,clientes);
}

module.exports = {novo}
