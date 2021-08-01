const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const lang = require('./lang/pt-Br.json');
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

    app.post('/sendmail', (req, res) => {
        // let assunto = req.body.assunto;
        // let mensagem = req.body.mensagem;
        let assunto = "Teste";
        let mensagem = "Treste 123";
        enviarEmail(`${assunto}`, `${mensagem}`);
    })

// Config do Emailconst nodemailer = require('nodemailer');
const nodemailer = require('nodemailer');
const SMTP_CONFIG = require('./config/smtp');

const transport = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass
    },
    tls: {
        rejectUnauthorized: false
    }
})

async function enviarEmail(assunt, msg) {
    await transport.sendMail({
        text: `${msg}`,
        subject: `${assunt}`,
        from: `Lab Física <${SMTP_CONFIG.user}>`,
        to: ['jefferson.negociom03@gmail.com']
    })
}

// Execução local
    const port = process.env.PORT || 5000;

    app.listen(port, () => {
        console.log(`Server rodando na porta: ${port}`);
    })