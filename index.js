const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();

const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const serverFunction = require('./public/api/serverFunction');
require('dotenv/config')

const langs = require('./public/langs/langs');

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
    langs.forEach(lang  => {
        app.get(`${lang.route}`, async (req, res) => {
            res.render('home', lang);
        });
    });

// Rotas de envios
    app.post('/send', (req, res) => {
        serverFunction(req, res, MongoClient);
    })

    app.post('/sendmail', (req, res) => {
        serverFunction(req, res, MongoClient);
    })


// Running:
    const port = 2000;

    app.listen(port, () => console.log(`Listening on port: ${port}`) );