const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();

const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const serverFunction = require('./public/api/serverFunction');
require('dotenv/config')

const langs = require('./public/langs/langs');
const { json } = require('body-parser');

// Static Files:
    app.use(express.static(__dirname + '/public'));

// Template Engine:
    app.set('views', path.join(__dirname, './views'));
    app.engine('ejs', ejs.renderFile);
    app.set('view engine', 'ejs');

// BodyParser:
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json())

// Routes:
    /* Tradução Pt-br//En */
    langs.forEach(lang  => {
        app.get(`${lang.route}`, async (req, res) => {
            res.render('home', lang);
        });
    });

    /* Rota admin */
    app.get(`/admin`, async (req, res) => {
        res.render(`pages/admin`, {log: false})
    })



// Rotas de envios
    /* Envio de Email */
    app.post('/send', (req, res) => {
        serverFunction(req, res, MongoClient);
    })

    app.post('/sendmail', (req, res) => {
        serverFunction(req, res, MongoClient);
    })

    /* Verificação de usuário */
    app.post(`/admin`, async (req, res) => {
        let user = req.body.user;
        let pass = req.body.pass;

        let user_env = process.env.USER_ADMIN;
        let pass_env = process.env.PASS_ADMIN;
        
        let result = null;

        let uri = process.env.MONGO_URI;
        let client = new MongoClient(uri);

        let log = false;
        
        if (user === user_env && pass === pass_env) {
            log = true;

            try {
                // Conectar no mongoDB
                await client.connect();
                // console.log('Conected')
          
                // Inserir mensagem 
                result = await client.db("labfisica")
                .collection("mensagens")
                .find({})
                .toArray();
                  
          
            } catch (error) {
                console.error(error);
            } finally {
                await client.close();
            }

        } else {
            log = false;
        }

        res.render(`pages/admin`, {log, result});
    })


// Running:
    const port = 3000;

    app.listen(port, () => console.log(`Listening on port: ${port}`) );