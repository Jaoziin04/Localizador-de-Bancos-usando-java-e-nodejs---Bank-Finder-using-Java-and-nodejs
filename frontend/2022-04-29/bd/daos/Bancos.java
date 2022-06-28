package bd.daos;

import java.sql.*;
import bd.*;
import bd.core.*;
import bd.dbos.*;

public class Bancos
{
    public static boolean cadastrado (int codigo) throws Exception
    {
        boolean retorno = false;

        try
        {
            String sql;

            sql = "SELECT * " +
                    "FROM BANCOS " +
                    "WHERE NUMERODEREGISTRO = ?";

            BDPostgreSQL.COMANDO.prepareStatement (sql);

            BDPostgreSQL.COMANDO.setInt (1, codigo);

            MeuResultSet resultado = (MeuResultSet)BDPostgreSQL.COMANDO.executeQuery ();

            retorno = resultado.first(); // pode-se usar resultado.last() ou resultado.next() ou resultado.previous() ou resultado.absotule(numeroDaLinha)

            /* // ou, se preferirmos,

            String sql;

            sql = "SELECT COUNT(*) AS QUANTOS " +
                  "FROM Bancos " +
                  "WHERE CODIGO = ?";

            BDPostgreSQL.COMANDO.prepareStatement (sql);

            BDPostgreSQL.COMANDO.setInt (1, codigo);

            MeuResultSet resultado = (MeuResultSet)BDPostgreSQL.COMANDO.executeQuery ();

            resultado.first();

            retorno = resultado.getInt("QUANTOS") != 0;

            */
        }
        catch (SQLException erro)
        {
            throw new Exception ("Erro ao procurar banco");
        }

        return retorno;
    }

    public static void incluir (Banco banco) throws Exception
    {
        if (banco==null)
            throw new Exception ("Livro nao fornecido");

        try
        {
            String sql;

            sql = "INSERT INTO Bancos " +
                    "(NUMERODEREGISTRO,NOME,CEP,NUMERO,COMPLEMENTO,FUNCIONARIOS,CLIENTES) " +
                    "VALUES " +
                    "(?,?,?,?,?,?,?)";

            BDPostgreSQL.COMANDO.prepareStatement (sql);

            //BDPostgreSQL.COMANDO.setInt    (1, banco.getNumeroDeRegistro ());
            BDPostgreSQL.COMANDO.setString (2, banco.getNome() );
            BDPostgreSQL.COMANDO.setInt  (3, banco.getNumero ());
            BDPostgreSQL.COMANDO.setString (4, banco.getCep() );
            BDPostgreSQL.COMANDO.setString (5, banco.getComplemento() );
            BDPostgreSQL.COMANDO.setInt (6, banco.getClientes() );
            BDPostgreSQL.COMANDO.setInt (7, banco.getFuncionarios());

            BDPostgreSQL.COMANDO.executeUpdate ();
            BDPostgreSQL.COMANDO.commit        ();
        }
        catch (SQLException erro)
        {
            System.err.println(erro.getMessage());
            BDPostgreSQL.COMANDO.rollback();
            throw new Exception ("Erro ao inserir banco");
        }
    }

    public static void excluir (int codigo) throws Exception
    {
        if (!cadastrado (codigo))
            throw new Exception ("Nao cadastrado");

        try
        {
            String sql;

            sql = "DELETE FROM BANCOS " +
                    "WHERE NUMERODEREGISTRO=?";

            BDPostgreSQL.COMANDO.prepareStatement (sql);

            BDPostgreSQL.COMANDO.setInt (1, codigo);

            BDPostgreSQL.COMANDO.executeUpdate ();
            BDPostgreSQL.COMANDO.commit        ();        }
        catch (SQLException erro)
        {
            BDPostgreSQL.COMANDO.rollback();
            throw new Exception ("Erro ao excluir banco");
        }
    }

    public static void alterar (Banco banco) throws Exception
    {
        if (banco==null)
            throw new Exception ("banco nao fornecido");

       // if (!cadastrado (banco.getNumeroDeRegistro()))
         //   throw new Exception ("Nao cadastrado");

        try
        {
            String sql;

            sql = "UPDATE Bancos " +
                    "SET NOME=?, NUMERO=?, CEP=?, COMPLEMENTO=?, CLIENTES=?, FUNCIONARIOS=?" +
                    "WHERE NUMERODEREGISTRO = ?";

            BDPostgreSQL.COMANDO.prepareStatement (sql);

            BDPostgreSQL.COMANDO.setString (1, banco.getNome() );
            BDPostgreSQL.COMANDO.setInt  (2, banco.getNumero ());
            BDPostgreSQL.COMANDO.setString (3, banco.getCep() );
            BDPostgreSQL.COMANDO.setString (4, banco.getComplemento() );
            BDPostgreSQL.COMANDO.setInt (5, banco.getClientes() );
            BDPostgreSQL.COMANDO.setInt (6, banco.getFuncionarios() );
           // BDPostgreSQL.COMANDO.setInt    (7, banco.getNumeroDeRegistro ());

            BDPostgreSQL.COMANDO.executeUpdate ();
            BDPostgreSQL.COMANDO.commit        ();
        }
        catch (SQLException erro)
        {
            BDPostgreSQL.COMANDO.rollback();
            throw new Exception ("Erro ao atualizar dados de banco");
        }
    }

    public static Banco getBanco (int codigo) throws Exception
    {
        Banco banco = null;

        try
        {
            String sql;

            sql = "SELECT * " +
                    "FROM BANCOS " +
                    "WHERE NUMERODEREGISTRO = ?";

            BDPostgreSQL.COMANDO.prepareStatement (sql);

            BDPostgreSQL.COMANDO.setInt (1, codigo);

            MeuResultSet resultado = (MeuResultSet)BDPostgreSQL.COMANDO.executeQuery ();

            if (!resultado.first())
                throw new Exception ("Nao cadastrado");

           // banco = new Banco (resultado.getInt("NUMERODEREGISTRO"),
                    //resultado.getString("NOME"),
                    //resultado.getString ("CEP"),
                    //resultado.getInt("NUMERO"),
                    //esultado.getString("COMPLEMENTO"),
                    //resultado.getInt("FUNCIONARIOS"));
                   // resultado.getInt("CLIENTES"));
        }
        catch (SQLException erro)
        {
            throw new Exception ("Erro ao procurar banco");
        }

        return banco;
    }

    public static MeuResultSet getBancos () throws Exception
    {
        MeuResultSet resultado = null;

        try
        {
            String sql;

            sql = "SELECT * " +
                    "FROM Bancos";

            BDPostgreSQL.COMANDO.prepareStatement (sql);

            resultado = (MeuResultSet)BDPostgreSQL.COMANDO.executeQuery ();
        }
        catch (SQLException erro)
        {
            throw new Exception ("Erro ao recuperar bancos" +
                    "");
        }

        return resultado;
    }
}
