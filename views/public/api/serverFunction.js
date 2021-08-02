module.exports = async (req, res, MongoClient) => {
  let assunto = req.body.assunto;
  let mensagem = req.body.mensagem;
  let conn = false;
  console.log({assunto, mensagem});

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

  console.log("Fununciou");

  res.json({
    body: req.body,
    conected: conn,
    query: req.query,
    cookies: req.cookies,
  });
  
  
};