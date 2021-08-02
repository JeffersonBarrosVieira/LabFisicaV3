const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const lang = require('./lang/pt-Br.json');
const app = express();

require('dotenv/config')

const sendMessage = require('./views/public/api/sendMessage')

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
        console.log({assunto, mensagem});
    })


// Execução local
    const port = process.env.PORT || 5000;

    app.listen(port, () => {
        console.log(`Server rodando na porta: ${port}`);
    })