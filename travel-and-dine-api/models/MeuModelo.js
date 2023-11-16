const mongoose = require('mongoose');

const meuModeloSchema = new mongoose.Schema({
  nome: String,
  destination: String,
  description: String,
  caminhoFoto: [String],
  // outros campos conforme necessário
});

module.exports = mongoose.model('MeuModelo', meuModeloSchema);
