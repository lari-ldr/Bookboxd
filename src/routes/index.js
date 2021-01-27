// responsável por carregar todas as rotas da aplicação
import express from 'express';
import booksRoute from './books';
import usersRoute from './users';
import reviewsRoute from './reviews';

const router = express.Router();

router.use('/books', booksRoute);
router.use('/books', reviewsRoute);
router.use('/users', usersRoute);
router.get('/', (req, res)=> res.send('A simple API for book lovers ;)'));
export default router;