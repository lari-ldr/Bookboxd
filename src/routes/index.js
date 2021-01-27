import express from 'express';
import booksRoute from './books';
import usersRoute from './users';

const router = express.Router();

router.use('/books', booksRoute);
router.use('/users', usersRoute);
router.get('/', (req, res) => res.send('A simple API for book lovers ;)'));

export default router;
