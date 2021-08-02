const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const lang = require('./lang/pt-Br.json');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();

require('dotenv/config')

// Configs
    // Ejs
        app.set('views', path.join(__dirname, 'views'));
        app.engine('ejs', ejs.renderFile);
        app.set('view engine', 'ejs');
        app.use(express.static(__dirname + '/views/public'));
    // BodyParser
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json())

// Rotas
    app.get('/', (req, res) => {
        res.render(path.join(__dirname + '/views/home.ejs'), lang)
    })

    app.post('/send', (req, res) => {
        let assunto = req.body.assunto;
        let mensagem = req.body.mensagem;
        // console.log({assunto, mensagem});
        enviarMensagem(assunto, mensagem).catch(function(err) {
            console.log(err)
        })
    })

// Enviar mensagem
// function listDatabases(client, assunto, mensagem){
//     const result = await client.db("labfisica")
//     .collection("mensagens")
//     .insertOne({
//         assunto: `${assunto}`,
//         mensagem: `${mensagem}`,
//         data: new Date().toLocaleString("pt-BR")
//     });
//     console.log(`Mensagem inserida com id: ${ result.insertedId }`);
// }

// async function enviarMensagem(assunto, mensagem) {
//     var conn = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     console.log( await conn.db('labfisica').collection('mensagens').countDocuments({}) );
// }

async function enviarMensagem(assunto, mensagem){

    const uri = process.env.MONGO_URI;
    
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log('Conected')
        // await listDatabases(client, assunto, mensagem);

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
};

// Execução local
    const port = process.env.PORT || 5000;

    app.listen(port, () => {
        console.log(`Server rodando na porta: ${port}`);
    })