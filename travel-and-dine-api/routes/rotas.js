const express = require('express');
const multer = require('multer');
const MeuModelo = require('../models/MeuModelo');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage: storage });

const camposPermitidos = new Set([
  'nome', 'endereco', 'telefone', 'instagram', 'culinaria',
  'precos', 'avaliacao', 'tema', 'cartao', 'dias', 'horario', 'caminhoFoto'
]);

router.get('/filters', async (req, res) => {
  try {
    const culinaria = await MeuModelo.distinct('culinaria');
    const precos = await MeuModelo.distinct('precos');
    const avaliacao = await MeuModelo.distinct('avaliacao');
    const tema = await MeuModelo.distinct('tema');
    const cartao = await MeuModelo.distinct('cartao');
    const dias = await MeuModelo.distinct('dias');
    const horario = await MeuModelo.distinct('horario');
    // ... outros campos ...

    res.json({ culinaria, precos, avaliacao, tema, cartao, dias, horario });
  } catch (error) {
    res.status(500).send('Erro ao buscar opções de filtro: ' + error.message);
  }
});

router.get('/search', async (req, res) => {
  try {
    let filtro = {};

    for (const [chave, valor] of Object.entries(req.query)) {
      // Verifica se a chave está entre os campos permitidos
      if (!camposPermitidos.has(chave)) {
        return res.status(400).json(`Campo de filtro não permitido: ${chave}`);
      }

      if (Array.isArray(valor)) {
        // Trata campos que são listas
        filtro[chave] = { $in: valor };
      } else if (typeof valor === 'string' && valor.endsWith('*')) {
        // Trata campos string com curinga '*'
        let regex = new RegExp("^" + valor.slice(0, -1), "i");
        filtro[chave] = regex;
      } else {
        // Trata campos string normais
        filtro[chave] = valor;
      }
    }

    const elementos = await MeuModelo.find(filtro);
    res.json(elementos);
  } catch (error) {
    res.status(500).send('Erro ao buscar os elementos: ' + error.message);
  }
});



router.get('/search/:id', async (req, res) => {
  try {
      const restaurante = await MeuModelo.findById(req.params.id);
      res.json(restaurante);
  } catch (error) {
      res.status(500).send('Erro ao buscar o restaurante: ' + error.message);
  }
});

router.get('/upload', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

router.post('/upload', upload.single('minhaFoto'), async (req, res) => {
  const novoItem = new MeuModelo({
    nome: req.body.nome,
    caminhoFoto: 'image/' + req.file.filename
  });

  try {
    await novoItem.save();
    res.send('Item com foto adicionado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao salvar o item.');
  }
});

module.exports = router;
