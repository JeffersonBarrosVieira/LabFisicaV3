const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();
const lang = require('./lang/pt-Br.json');

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views/public'));

console.log(process.env.EMAIL_PASS);

app.get('/', (req, res) => {
    res.render(path.join(__dirname + '/views/home.ejs'), lang)
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server rodando na porta: ${port}`);
})