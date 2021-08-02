module.exports = (req, res) => {
  let assunto = req.body.assunto;
  let mensagem = req.body.mensagem;
  let conn = false;
  console.log({assunto, mensagem});

  async () => {
    let uri = process.env.MONGO_URI;
    let client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Conected')
        conn = true;
        // await listDatabases(client, assunto, mensagem);

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
  }

  res.json({
    body: req.body,
    conected: conn,
    query: req.query,
    cookies: req.cookies,
  });
};