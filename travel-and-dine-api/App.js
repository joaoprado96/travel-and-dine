require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const minhaRota = require('./routes/rotas');

const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Não foi possível conectar ao MongoDB', err));
// Servir arquivos estáticos da pasta 'public'

app.use(cors({
  origin: 'http://localhost:3000' // Permitir apenas solicitações do frontend em localhost:3000
}));

app.use(express.static('public'));

app.use('/rotas', minhaRota);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Servidor rodando: http://localhost:${port}`);
});
