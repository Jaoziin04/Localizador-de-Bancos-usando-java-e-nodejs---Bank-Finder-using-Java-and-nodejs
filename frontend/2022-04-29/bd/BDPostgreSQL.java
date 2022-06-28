package bd;

import bd.core.*;
import bd.daos.*;

public class BDPostgreSQL
{
    public static final MeuPreparedStatement COMANDO;

    static
    {
        MeuPreparedStatement comando = null;

        try
        {
            comando =
                    new MeuPreparedStatement (
                            "org.postgresql.Driver",
                            "jdbc:postgresql://ec2-34-236-94-53.compute-1.amazonaws.com/d84829vd9hkppc",
                            "wgjwwykzonisjx", "2dac371941c9d0de6152a51c41e98a247df8972d397f972146b3c627d2c57b51");
        }
        catch (Exception erro)
        {
            System.err.println(erro.getMessage());
            System.err.println ("Problemas de conexao com o BD");
            System.exit(0); // aborta o programa
        }

        COMANDO = comando;
    }
}