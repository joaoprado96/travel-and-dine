const express = require('express');
const multer = require('multer');
const MeuModelo = require('../models/MeuModelo');
const router = express.Router();
const upload = multer({ storage: storage });

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

router.get('/buscar', async (req, res) => {
  try {
    const elementos = await MeuModelo.find();
    res.json(elementos);
  } catch (error) {
    res.status(500).send('Erro ao buscar os elementos: ' + error.message);
  }
});

router.get('/buscar/:id', async (req, res) => {
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
