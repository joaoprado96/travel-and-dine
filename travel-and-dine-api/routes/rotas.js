const express = require('express');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const xss = require('xss-clean');
const RestaurantModel = require('../models/RestaurantModel');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'image/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const image = multer({ storage: storage });

const camposPermitidos = new Set([
  'nome', 'endereco', 'telefone', 'instagram', 'culinaria',
  'precos', 'avaliacao', 'tema', 'cartao', 'dias', 'horario', 'caminhoFoto'
]);

const validCuisines = ["Africana","Alemã","Árabe","Bares","Brasileira","Brunch","Cafeterias","Coreana","Chinesa","Churrasco","Francesa","Frutos do mar","Gourmet","Italiana","Japonesa","Lanches","Mediterrânea","Mexicana","Peruana","Pizza","Poke","Pub","Saudável","Sobremesas","Vegetariana","Vegana"]; // Lista completa
const validPrices = [1, 2, 3, 4, 5];
const validRatings = [1, 2, 3, 4, 5];
const validThemes = ["Chá da tarde","Dançar","Encontros amorosos","Reunião de amigos","Reunião de familiares","Aniversário","Confraternização do trabalho","Rodízio"]; // Lista completa
const validCards = ["American Express","Banricompras - Crédito","Banricompras","Ben Refeição","Cooper Card","Cheque","Dinheiro","Diners","Elo - Crédito","Elo","Hipercard","Goodcard","Mastercard - Crédito","Mastercard","Refeisul","Ticket","Vale Card","Vale Alelo Refeição","Verocard","Visa - Crédito","Visa","VR Refeição"]; // Lista completa
const validDays = ["segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado","domingo"]; // Lista completa
const validHours = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"]; // Lista completa

const restaurantValidationRules = [
  body('nome').isString().withMessage('Nome deve ser uma string'),
  body('endereco').isString().withMessage('Endereço deve ser uma string'),
  body('telefone').isString().withMessage('Telefone deve ser uma string'),
  body('instagram').isString().withMessage('Instagram deve ser uma string'),
  body('culinaria').isArray().withMessage('Culinária deve ser um array')
    .custom((value) => value.every(v => validCuisines.includes(v)))
    .withMessage('Valores inválidos em culinaria'),
  body('precos').isIn(validPrices).withMessage('Valor inválido em precos'),
  body('avaliacao').isIn(validRatings).withMessage('Valor inválido em avaliacao'),
  body('tema').isArray().withMessage('Tema deve ser um array')
    .custom((value) => value.every(v => validThemes.includes(v)))
    .withMessage('Valores inválidos em tema'),
  body('cartao').isArray().withMessage('Cartão deve ser um array')
    .custom((value) => value.every(v => validCards.includes(v)))
    .withMessage('Valores inválidos em cartao'),
  body('dias').isArray().withMessage('Dias deve ser um array')
    .custom((value) => value.every(v => validDays.includes(v)))
    .withMessage('Valores inválidos em dias'),
  body('horario').isArray().withMessage('Horário deve ser um array')
    .custom((value) => value.every(v => validHours.includes(v)))
    .withMessage('Valores inválidos em horario'),
  body('caminhoFoto').isArray().withMessage('Caminho da foto deve ser um array')
];

function validateRestaurantInput(input) {
  const errors = {};
  const {
    nome, endereco, telefone, instagram, culinaria, precos,
    avaliacao, tema, cartao, dias, horario, caminhoFoto
  } = input;

  // Validando campos obrigatórios
  camposPermitidos.forEach(field => {
    if (!input[field]) {
      errors[field] = `${field} é obrigatório`;
    }
  });

  // Validando valores dos campos
  if (culinaria && !culinaria.every(cuisine => validCuisines.includes(cuisine))) {
    errors.culinaria = 'Valores inválidos em culinaria';
  }
  if (precos !== undefined && !validPrices.includes(precos)) {
    errors.precos = 'Valor inválido em precos';
  }
  if (avaliacao !== undefined && !validRatings.includes(avaliacao)) {
    errors.avaliacao = 'Valor inválido em avaliacao';
  }
  if (tema && !tema.every(t => validThemes.includes(t))) {
    errors.tema = 'Valores inválidos em tema';
  }
  if (cartao && !cartao.every(c => validCards.includes(c))) {
    errors.cartao = 'Valores inválidos em cartao';
  }
  if (dias && !dias.every(d => validDays.includes(d))) {
    errors.dias = 'Valores inválidos em dias';
  }
  if (horario && !horario.every(h => validHours.includes(h))) {
    errors.horario = 'Valores inválidos em horario';
  }
  if (caminhoFoto && !Array.isArray(caminhoFoto)) {
    errors.caminhoFoto = 'Caminho da foto deve ser um array';
  }

  return Object.keys(errors).length === 0 ? null : errors;
}


// Rota POST para adicionar um restaurante
router.post('/addrestaurant', restaurantValidationRules, async (req, res) => {
  // const errors2 = validationResult(req);
  // if (!errors2.isEmpty()) {
  //   return res.status(400).json({ 
  //     message: 'Erro de validação nos dados de entrada', 
  //     errors: errors2.array().map(err => ({ campo: err.param, mensagem: err.msg }))
  //   });
  // }
  
  const validationErrors = validateRestaurantInput(req.body);

  if (validationErrors) {
    return res.status(400).json({
      message: 'Erro de validação',
      errorsfunc: validationErrors
    });
  }

  try {
    const newRestaurant = new RestaurantModel(req.body);
    await newRestaurant.save();
    res.status(201).send('Restaurante adicionado com sucesso.');
  } catch (error) {
    res.status(500).send('Erro ao salvar o restaurante: ' + error.message);
  }
});

router.get('/filters', async (req, res) => {
  try {
    const culinaria = await RestaurantModel.distinct('culinaria');
    const precos = await RestaurantModel.distinct('precos');
    const avaliacao = await RestaurantModel.distinct('avaliacao');
    const tema = await RestaurantModel.distinct('tema');
    const cartao = await RestaurantModel.distinct('cartao');
    const dias = await RestaurantModel.distinct('dias');
    const horario = await RestaurantModel.distinct('horario');
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

    const elementos = await RestaurantModel.find(filtro);
    res.json(elementos);
  } catch (error) {
    res.status(500).send('Erro ao buscar os elementos: ' + error.message);
  }
});

router.get('/search/:id', async (req, res) => {
  try {
      const restaurante = await RestaurantModel.findById(req.params.id);
      res.json(restaurante);
  } catch (error) {
      res.status(500).send('Erro ao buscar o restaurante: ' + error.message);
  }
});

router.get('/image', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

router.post('/image', image.single('img'), async (req, res) => {
  const novoItem = new RestaurantModel({
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
