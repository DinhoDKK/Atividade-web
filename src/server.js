const express = require("express");

const app = express();

/**
 * Configuração do parser para requisições post
 */
 app.use(express.json());
 app.use(express.urlencoded({
     extended: true
 }))

 /**
 * Conexão com banco de dados via pool de conexões
 * https://node-postgres.com/
 */
  const pool = require('./dao/conexao');



const PORTA = process.env.PORT || 8080;
 app.listen(PORTA, function(){
     console.log("Servidor rodando na porta 8080");
 })


app.use('/publico', express.static(__dirname + '/publico'));

app.get('/album', function(req,resp){
   resp.sendFile(__dirname + '/views/album.html')
});

app.post('/album-digital',function(req, resp){
    
    //Conferir dados da requisição
    /* console.log(`
    req.body.nome = ${req.body.nome}
    req.body.cpf = ${req.body.cpf}
    req.body.telefone = ${req.body.telWhats}
    req.body.email = ${req.body.email}
    req.body.estado = ${req.body.estado}
    req.body.cidade = ${req.body.cidade}
    req.body.dataNascimento = ${req.body.dataNascimento}
    req.body.nomeresp = ${req.body.nomeresp}
    req.body.cpfresp = ${req.body.cpfresp}
    req.body.titulo = ${req.body.titulo}
    req.body.nomeFotogra = ${req.body.nomeFotogra}
    req.body.foto = ${req.body.foto}
    `); 
     */
    pool.query(`INSERT INTO album
               (nome, cpf, tel, email, estado, cidade, data_nascimento, nome_responsavel, cpf_responsavel, titulo_foto, nome_fotografo, nome_foto) 
             VALUES 
               ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`, 
                [req.body.nome, req.body.cpf, req.body.telefone, req.body.email, req.body.estado, req.body.cidade, req.body.dataNascimento, req.body.nomeresp, req.body.cpfresp, req.body.titulo, req.body.nomeFotogra, req.body.foto])
        .then(res => console.log('ok'))
       .catch(err => console.log('erro: ' + err));

   resp.sendFile(__dirname + '/views/album.html');
});