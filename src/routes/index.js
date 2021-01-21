// responsável por carregar todas as rotas da aplicação
import express from 'express';
import booksRoute from './books';

const router = express.Router();

router.use('/books', booksRoute);
router.get('/', (req, res)=> res.send('A simple API for book lovers ;)'));
export default router;