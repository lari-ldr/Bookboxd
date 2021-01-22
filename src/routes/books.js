// responsável por carregar todas as rotas da aplicação
import express from 'express';
import BooksController from '../controllers/Books';
import Book from '../models/Book';

const router = express.Router();

const newBooksController = new BooksController(Book);

router.get('/', (req, res) => newBooksController.getAll(req, res));
router.get('/:id', (req, res) => newBooksController.getById(req, res));
router.post('/', (req, res)=> newBooksController.store(req, res));
router.put('/:id', (req, res)=> newBooksController.edit(req, res));
router.delete('/:id', (req, res) => newBooksController.deleteOne(req, res));

export default router;