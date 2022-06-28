package bd.dbos;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)

public class Banco
{
    int numeroDeRegistro, numero,  funcionarios, clientes;
    String nome, cep, complemento;

    public int getNumeroDeRegistro() {return numeroDeRegistro;}
    public String  getCep() {return cep;}
    public int getNumero() {return numero;}
    public int getFuncionarios() {return funcionarios;}
    public int getClientes() {return clientes;}
    public String getNome() {return nome;}
    public String getComplemento() {return complemento;}

    public void setNumeroDeRegistro(int numeroderegistro) throws Exception
    {
        if(numeroderegistro <= 0)
            throw new Exception("Número de Registro invalido");
        this.numeroDeRegistro = numeroderegistro;
    }



    public void setCep(String cep) throws Exception
    {
        if(cep == "")
            throw new Exception("CEP inválido");
        this.cep = cep;
    }



    public void setNumero(int numero) throws Exception
    {
        if(numero == 0)
            throw new Exception("número inválido");
        this.numero = numero;
    }

    public void setComplemento(String complemento) throws Exception
    {
        if(complemento == "")
            throw new Exception("Esse banco não tem complemento");
        this.complemento = complemento;
    }


    public void setFuncionarios(int funcionarios) throws Exception
    {
        if(funcionarios <= 0)
            throw new Exception("Não há funcionarios");
        this.funcionarios = funcionarios;
    }



    public void setClientes(int clientes) throws Exception
    {
        if(clientes <= 0)
            throw new Exception("Não há clientes");
        this.clientes = clientes;
    }



    public void setNome(String nome) throws Exception
    {
        if(nome == "")
            throw new Exception("Esse banco não tem nome");
        this.nome = nome;
    }





    public Banco (int numeroDeRegistro, String nome, String cep, int numero, String complemento, int funcionarios, int clientes ) throws Exception
    {
        this.setNumeroDeRegistro(numeroDeRegistro);
        this.setNome (nome);
        this.setCep(cep);
        this.setNumero(numero);
        this.setComplemento(complemento);
        this.setFuncionarios(funcionarios);
        this.setClientes(clientes);

    }

    public Banco ( ) throws Exception
    {

    }

    public String toString ()
    {
        String ret="";

        ret+="Numero de Registro: "+this.numeroDeRegistro +"\n";
        ret+="Nome..............: "+this.nome  +"\n";
        ret+="Numero............:"+this.numero +"\n";
        ret+="Complemento.......: "+this.complemento +"\n";
        ret+="Clientes..........:"+this.clientes +"\n";
        ret+="Funcionarios......:"+this.funcionarios +"\n";



        return ret;
    }

    public boolean equals (Object obj)
    {
        if (this==obj)
            return true;

        if (obj==null)
            return false;

        if (!(obj instanceof Banco))
            return false;

        var bank = (Banco)obj;

        if (this.numeroDeRegistro !=bank.numeroDeRegistro)
            return false;

        if (this.nome.equals(bank.nome))
            return false;

        if (this.cep!=bank.cep)
            return false;

        if (this.numero!=bank.numero)
            return false;

        if (this.clientes!=bank.clientes)
            return false;

        if (this.funcionarios!=bank.funcionarios)
            return false;

        if (this.complemento!=bank.complemento)
            return false;



        return true;
    }

    public int hashCode ()
    {
        int ret=666;

        ret = 7*ret + new int[(this.numeroDeRegistro)].hashCode();
        ret = 7*ret + this.nome.hashCode();
        ret = 7*ret + this.cep.hashCode();
        ret = 7*ret + this.complemento.hashCode();
        ret = 7*ret + new int[(this.numero)].hashCode();
        ret = 7*ret + new int[(this.funcionarios)].hashCode();
        ret = 7*ret + new int[(this.clientes)].hashCode();

        return ret;
    }


    public Banco (Banco modelo) throws Exception
    {
        this.numeroDeRegistro = modelo.numeroDeRegistro; // nao clono, pq nao eh objeto
        this.nome   = modelo.nome;   // nao clono, pq nao eh clonavel
        this.cep  = modelo.cep;  // nao clono, pq nao eh objeto
        this.nome  = modelo.nome;
        this.numero  = modelo.numero;
        this.complemento = modelo.complemento;
        this.funcionarios  = modelo.funcionarios;
        this.clientes  = modelo.clientes;
    }

    public Object clone ()
    {
        Banco ret=null;

        try
        {
            ret = new Banco (this);
        }
        catch (Exception erro)
        {} // nao trato, pq this nunca � null e construtor de
        // copia da excecao qdo seu parametro for null

        return ret;
    }


}
