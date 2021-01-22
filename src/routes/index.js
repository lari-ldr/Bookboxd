// responsável por carregar todas as rotas da aplicação
const express = require('express');
const booksRoute = require('./books');

const router = express.Router();

router.use('/books', booksRoute);
router.get('/', (req, res)=> res.send('A simple API for book lovers ;)'));
module.exports = router;