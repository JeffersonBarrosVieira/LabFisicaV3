const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();

const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const serverFunction = require('./api/serverFunction');
require('dotenv/config')

const langs = require('./public/langs/langs');
const { json } = require('body-parser');

const nodemailer = require('nodemailer');
const config = require('./config/smtp');
const { create } = require('domain');

// Conexão nodemailer
const transporter = nodemailer.createTransport(config);


async function enviarCodigo(codigo, email){
    try {
            await transporter.sendMail({
                from:  `LabFísica <${config.auth.user}>`,
                to: `${email}`,
                // bcc: ['b.boydjeff15@gmail.com', 'barrosjefferson@acad.ifma.edu.br', 'jefferson.negociom03@gmail.com'],
                subject: `Verificação da Conta`,
                html: `
                    <h3>Seu código para o cadastro: <b>${codigo}</b></h3>
                `
            });
        } catch ( error ) {
            console.error(error);
        }
}

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

// app.post('/sendmail', (req, res) => {
//     serverFunction(req, res, MongoClient);
// })

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

async function verifyUser(client, find){
    let verify = false;

    try {
        let result = await client.db('labfisica')
                    .collection('users')
                    .findOne(find);

        if (result) {
            verify = true;
        }

    } catch(error){
        console.error(error);
    }

    return verify;
} 

async function createUser(client, find, insert){
    let sucesso = false;

    try {
        let result = await client.db('labfisica')
                                .collection('users')
                                .findOne(find);

        if(result == null) {
            await client.db('labfisica')
                        .collection('users')
                        .insertOne(insert);
            
            sucesso = true;
        }

    } catch (error) {
        console.error(error);
    }

    return sucesso;
}

async function readUser(){

}

async function updateUser(client, find, insert){
    let sucesso = false;

    try {
        await client.db('labfisica')
                    .collection('users')
                    .findOneAndUpdate(
                        find,
                        {
                            $set: insert
                        }
                    );
        
        sucesso = true;

    } catch (error) {
        console.error(error);
    }

    return sucesso;
}

async function deleteUser(){

}


app.post(`/cadastrar`, async (req, res) => { // método para pegar os dados e cadastrar
    let nome = req.body.nome;
    let email = req.body.email;
    let imageUrl = req.body.imageUrl;
    let codigo = req.body.codigo;

    let google = req.body.google ? true : false;

    let uri = process.env.MONGO_URI;
    let client = new MongoClient(uri);

    let sucesso = false;

    if (email !== '' && !google && codigo == undefined) {

        let find = {
            email: `${email}`
        };
        let insert = { 
            email: `${email}`,
            verificado: 'false',
            codigo: `${codigo}`
        }
        let codigo = Math.floor(Math.random() * (900000 - 400000 + 1)) + 400000;

        // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        await client.connect(); // Inínio da conexão

        sucesso = await createUser(client, find, insert);

        if (sucesso == false)
            if(await verifyUser(client, { email: `${email}`, verificado: 'false' }))
                sucesso = await updateUser(client, find, insert);

        await client.close(); // Fim da conexão
        // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        if (sucesso) {
            // Mandar para página de verificar código enviado no email
            await enviarCodigo(codigo, email);
            res.render(`pages/verificacao`, { sucesso: sucesso, tentativa: false, user: null, email: email });
        } else {
            // Retornar a página pois o email já está cadastrado
            res.render(`pages/cadastrar`, { sucesso: sucesso, tentativa: true, user: null });
        }
    } else if(!google) {

        // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        await client.connect(); // Inicio da conexão

        sucesso = await verifyUser(client, { email: `${email}`, verificado: `false`, codigo: `${codigo}` });

        await client.close(); // Fim da Conexão
        // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        if(sucesso){
            //mandar pra página de criar usuário
            res.render(`pages/criarUsuario`, { sucesso: sucesso, tentativa: false, user: null, email: email });
        } else {
            // codigo invalido
            res.render(`pages/verificacao`, { sucesso: sucesso, tentativa: true, user: null, email: email });
        }

    }

    if(google) {

        let find = {
            email: `${email}`
        };

        let insert = { 
            email: `${email}`,
            nome: `${nome}`,
            verificado: 'true',
            imageUrl: `${imageUrl}`,
            codigo: `0`
        }

        await client.connect(); // Inicia a conexão

        sucesso = await createUser(client, find, insert);

        await client.close(); // Finaliza a conexão

        console.log(sucesso);

        if(sucesso){
            //mandar pra página de criar usuário
            res.render(`pages/criarUsuario`, { sucesso: sucesso, tentativa: false, user: null, email: email });
        } else {
            // Retornar a página pois o email já está cadastrado
            res.render('home', {...langs[0]});
        }

        
    }
})

app.post(`/dados`, async (req, res) => {
    let nome = `${req.body.nome} ${req.body.sobrenome}`;
    let email = req.body.email;
    let user = req.body.user;
    let pass = req.body.pass;

    let result = null;

    let uri = process.env.MONGO_URI;
    let client = new MongoClient(uri);

    let sucesso = false;

    if(nome && email && user && pass) {

        try{
            await client.connect();

            result = await client.db('labfisica')
                    .collection('users')
                    .findOne({ user: `${user}`});

            if(result == undefined){
                result = await client.db('labfisica')
                        .collection('users')
                        .findOne({ email: `${email}`, verificado: `false` });
                    
                if(result) {
                    result = await client.db('labfisica')
                        .collection('users')
                        .findOneAndUpdate(
                            {
                                email: `${email}`,
                                verificado: `false`
                            },{
                                $set: {
                                    nome: `${nome}`,
                                    email: `${email}`,
                                    verificado: `true`,
                                    codigo: `0`,
                                    user: `${user}`,
                                    pass: `${pass}`,
                                    data: new Date().toLocaleString("pt-br", { timeZone: 'America/Sao_Paulo' })
                                }
                            }
                        )
    
                    // console.log('Usuário cadastrado');
                    sucesso = true;
                }
            }

        } catch (error) {
            console.error(error);
        } finally {
            await client.close();
        }

        if(sucesso){
            //enviarCodigo(codigo, email); tem que enviar que a conta foi criada com sucesso
            res.render(`pages/entrar`, { sucesso: sucesso, tentativa: true, user: null });
        } else {
            // Retornar a página pois o email já está cadastrado
            res.render(`pages/criarUsuario`, { sucesso: sucesso, tentativa: true, user: null, email: email });
        }
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
                .findOne({ user: user, pass: pass }) ||
                await client.db('labfisica')
                .collection('users')
                .findOne({ email: user, pass: pass });

        // console.log(result);
        sucesso = result ? true : false;



    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }

    if (sucesso) {
        let id = await result._id.toString();
        // console.log( id );
        res.render(`home`, { ...langs[0], user: result, id })
    } else {
        res.render(`pages/entrar`, { sucesso: sucesso, tentativa: true, user: null })
    }

})




// Running:
const port = 3000;

app.listen(port, () => console.log(`Listening on port: ${port}`));