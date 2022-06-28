const express  = require ('express');
const bd       = require ('./bd.js');
const rotas    = require ('./rotas.js');


function middleWareGlobal(req, res, next)
{
    console.time('Duração'); // inicio da rqeuisição
    console.log('Iniciou  o processamento da requisição '+req.method+' em '+req.url); // indica o início do processamento da url, indicando também o método

    next(); // função que chama o processamento, propriamente dito, da requisição
               
    console.log('Terminou o processamento da requisição '+req.method+' em '+req.url); // indica o término do processamento da url, indicando também o método
    console.timeEnd('Duração'); // informa duração do processamento da requisição
}


async function ativacaoDoServidor ()
{
    // const ret = await bd.estrutuSe();

    
    // if (ret===null)
    // {
    //     console.log ('Não foi possível estabelecer conexão com o BD!');
    //     process.exit(1);
    // }

    // if (ret===false)
    // {
    //     console.log ('Não foi possível estruturar o BD!');
    //     process.exit(1);
    // }

    const express = require('express');
    const app     = express();
    
    app.use(express.json());   // faz com que o express consiga processar JSON
    app.use(middleWareGlobal); // app.use cria o middleware global 

    app.post  ('/Banco2'     , rotas.inclusao); 
    app.put   ('/Banco2/:cep', rotas.atualizacao);
    app.delete('/Banco2/:cep', rotas.remocao);
    app.get   ('/Banco2/:cep', rotas.recuperacaoDeUm);
    app.get   ('/Banco2'     , rotas.recuperacaoDeTodos);

    console.log ('Servidor ativo na porta 3000...');
    app.listen(3000);
}
ativacaoDoServidor();
