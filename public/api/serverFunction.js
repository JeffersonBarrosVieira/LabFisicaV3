module.exports = async (req, res, MongoClient) => {
  let assunto = req.body.assunto;
  let mensagem = req.body.mensagem;
  let conn = false;

  let uri = process.env.MONGO_URI;
  let client = new MongoClient(uri);

  try {
      // Conectar no mongoDB
      await client.connect();
      // console.log('Conected')
      conn = true;

      // Inserir mensagem 
      const result = await client.db("labfisica")
      .collection("mensagens")
      .insertOne({
          assunto: `${assunto}`,
          mensagem: `${mensagem}`,
          data: new Date().toLocaleString("pt-BR")
      });
      // console.log(`Mensagem inserida com id: ${ result.insertedId }`);
        

  } catch (error) {
      console.error(error);
  } finally {
      await client.close();
  }

  res.json({
    body: req.body,
    conected: conn,
    query: req.query,
    cookies: req.cookies,
  });
  
  
};