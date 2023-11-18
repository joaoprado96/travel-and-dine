const mongoose = require('mongoose');

const RestaurantModelSchema = new mongoose.Schema({
  nome: String,
  endereco: String,
  telefone: String,
  instagram: String,
  culinaria: [String],
  precos: Number,
  avaliacao: Number,
  tema: [String],
  cartao: [String],
  dias: [String],
  horario: [String],
  caminhoFoto: [String],
  // outros campos conforme necessário
});

module.exports = mongoose.model('RestaurantModel', RestaurantModelSchema);
