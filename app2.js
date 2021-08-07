const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();

const langs = require('./public/langs/langs');

// Static Files:
    app.use(express.static(__dirname + '/public'));

// Template Engine:
    app.set('views', path.join(__dirname, './views'));
    app.engine('ejs', ejs.renderFile);
    app.set('view engine', 'ejs');

// Routes:
    langs.forEach(lang  => {
        app.get(`${lang.route}`, async (req, res) => {
            res.render('home', lang);
        });
    });

    
// Running:
    const port = 2000;

    app.listen(port, () => console.log(`Listening on port: ${port}`) );