module.exports = (req, res) => {
  let assunto = req.body.assunto;
  let mensagem = req.body.mensagem;
  console.log({assunto, mensagem});

  res.json({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
  });
};