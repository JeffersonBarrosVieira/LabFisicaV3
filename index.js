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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Routes:
/* Tradução Pt-br//En */
langs.forEach(lang => {
    app.get(`${lang.route}`, async (req, res) => {
        res.render('home', lang);
    });
});

/* Rota admin */
app.get(`/admin`, async (req, res) => {
    res.render(`pages/admin`, { log: false })
})

/* Rota cadastro */
app.get(`/cadastrar`, async (req, res) => {
    res.render(`pages/cadastrar`, { tentativa: false, user: null })
})

/* Rota para logar */
app.get(`/entrar`, async (req, res) => {
    res.render(`pages/entrar`, { tentativa: false, user: null })
})


// LOGIN GOOGLE TESTE

app.get(`/google`, async (req, res) => {
    res.render(`pages/googleLogin`, {});
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

    res.render(`pages/admin`, { log, result });
})

app.post(`/login`, async (req, res) => {
    let user = req.body.user;
    let pass = req.body.pass;

    let result = null;

    let uri = process.env.MONGO_URI;
    let client = new MongoClient(uri);

    let log = false;

    console.log('logado')

    try {
        await client.connect();

        result = await client.db('labfisica')
            .collection('users')
            .findOne({ user: user, pass: pass });
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }

    console.log(result == !null ? 'Usuário Existe' : 'Usuário não existe')
    res.send(JSON.stringify(result));
})

app.post(`/entrar`, async (req, res) => { // método para pegar os dados e cadastrar
    let nome = req.body.nome;
    let sobrenome = req.body.sobrenome;
    let email = req.body.email;
    let user = req.body.user;
    let pass = req.body.pass;

    let result = null;

    let uri = process.env.MONGO_URI;
    let client = new MongoClient(uri);

    let sucesso = false;

    if (nome !== '' ||
        sobrenome !== '' ||
        email !== '' ||
        user !== '' ||
        pass !== '') {
        try {
            await client.connect();

            result = await client.db('labfisica')
                .collection('users')
                .findOne({ user: user });

            if (result == null) {
                result = await client.db('labfisica')
                    .collection('users')
                    .insertOne({
                        nome: `${nome} ${sobrenome}`,
                        email: `${email}`,
                        user: `${user}`,
                        pass: `${pass}`,
                        data: new Date().toLocaleString("pt-br", { timeZone: 'America/Sao_Paulo' })
                    })

                // console.log('Usuário cadastrado');
                sucesso = true;
            } 
            // else {
            //     console.log('Usuário já existente');
            // }


        } catch (error) {
            console.error(error);
        } finally {
            await client.close();
        }
    }


    if (sucesso) {
        res.render(`pages/entrar`, { sucesso: sucesso, tentativa: true, user: null });
    } else {
        res.render(`pages/cadastrar`, { sucesso: sucesso, tentativa: true, user: null });
    }

})

app.post(`/`, async (req, res) => { // método para pegar os dados e logar
    let user = req.body.user;
    let pass = req.body.pass;

    let result = null;

    let uri = process.env.MONGO_URI;
    let client = new MongoClient(uri);

    let sucesso = false;

    try {
        await client.connect();

        result = await client.db('labfisica')
            .collection('users')
            .findOne({ user: user, pass: pass });

        // console.log(result);
        sucesso = result ? true : false;



    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }

    if (sucesso) {
        res.render(`home`, { ...langs[0], user: result })
    } else {
        res.render(`pages/entrar`, { sucesso: sucesso, tentativa: true, user: null })
    }

})


// Running:
const port = 3000;

app.listen(port, () => console.log(`Listening on port: ${port}`));