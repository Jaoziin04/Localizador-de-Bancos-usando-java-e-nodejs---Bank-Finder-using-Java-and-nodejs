package Main;

import Main.ClienteWS;
import bd.dbos.Banco;
import bd.daos.Bancos;

import java.util.Arrays;

public class Programa
{
    public static void main (String[] args) throws Exception {
        byte opcao = 0;


        for(;;)
        {
            System.out.println("Escolha uma opção");
            System.out.println("1 - adicionar");
            System.out.println("2 - pesquisar");
            System.out.println("3 - alterar");
            System.out.println("4 - excluir");
            System.out.println("5 - mostrar todos os dados");
            System.out.println("6 - sair");
            opcao = Teclado.getUmByte();
                try{
                    switch (opcao)
                    {
                        case 1:
                            System.out.println("Digite o numero de registro!");
                            int numeroDeRegistro = Teclado.getUmInt();

                            System.out.println("Digite o nome");
                            String nome = Teclado.getUmString();

                            System.out.println("Digite o número do banco");
                            int numero = Teclado.getUmInt();

                            System.out.println("Digite o CEP");
                            String cep = Teclado.getUmString();

                            System.out.println("Digite a quantidade de funcionarios");
                            int funcionarios = Teclado.getUmInt();

                            System.out.println("Digite a quantidade de clientes");
                            int clientes = Teclado.getUmInt();

                            System.out.println("Digite o complemento");
                            String complemento = Teclado.getUmString();

                            var banco2 = new Banco (numeroDeRegistro,nome, cep, numero, complemento, funcionarios,clientes );

                            ClienteWS.postObjeto (banco2, banco2.getClass(), "http://localhost:3000/Banco2");
                            System.out.println ("Banco incluido com sucesso!");

                            Banco banco = (Banco) ClienteWS.getObjeto(Banco.class, "http://localhost:3000/Banco2", banco2.getCep());
                            System.out.println (banco);
                            break;

                        case 2:

                                System.out.println("Digite o cep do banco que deseja pesquisar!");
                                cep = Teclado.getUmString();

                            if(cep != "")
                            {
                                System.out.println(ClienteWS.getObjeto(Banco.class, "http://localhost:3000/Banco2", cep));
                            }
                            else
                                System.out.println("Banco não existe!");



                            break;

                        case 3:
                            System.out.println("Digite o cep do banco a ser alterado!");
                            cep = Teclado.getUmString();

                            Banco banco3 = (Banco) ClienteWS.getObjeto(Banco.class, "http://localhost:3000/Banco2", cep);

                            System.out.println(banco3);

                            System.out.println("Digite o nome");
                             nome = Teclado.getUmString();
                            banco3.setNome(nome);


                            System.out.println("Digite o número do banco");
                             numero = Teclado.getUmInt();
                            banco3.setNumero(numero);


                            System.out.println("Digite a quantidade de funcionarios");
                             funcionarios = Teclado.getUmInt();
                            banco3.setFuncionarios(funcionarios);

                            System.out.println("Digite a quantidade de clientes");
                             clientes = Teclado.getUmInt();
                            banco3.setClientes(clientes);

                            System.out.println("Digite o complemento");
                             complemento = Teclado.getUmString();
                            banco3.setComplemento(complemento);


                            ClienteWS.putObjeto (Banco.class, banco3, "http://localhost:3000/Banco2", cep);
                            System.out.println ("Banco alterado com sucesso!");

                            System.out.println(ClienteWS.getObjeto(Banco.class, "http://localhost:3000/Banco2", cep));
                            System.out.println (banco3);
                            break;

                        case 4:
                            System.out.println("Digite o cep do banco que deseja excluir!");
                             cep = Teclado.getUmString();

                             if(cep != "")
                             {
                                 ClienteWS.deleteObjeto(Banco.class, "http://localhost:3000/Banco2", cep);
                                 System.out.println("Banco excluido com sucesso");
                             }
                             else
                                 System.out.println("Não dá pra excluir um banco inexistente!");

                            break;

                        case 5:
                            System.out.println("Pegando todos os Dados!");

                            Banco[] bancos = (Banco[]) ClienteWS.pegarTodos(Banco[].class, "http://localhost:3000/Banco2");

                            int i = 0;
                            do{
                                System.out.println(bancos[i]);
                                i++;


                                    System.out.println("Dados do \n" +bancos[i]+ "\npegos com sucesso");
                            }
                            while (bancos[i] != null);

                        case 6:
                            System.exit(0);
                            break;


                    }
                }
                catch (Exception err){
                    System.err.println(err.getMessage());
                }
        }
    }
}
