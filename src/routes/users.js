import express from 'express';
import UsersController from '../controllers/Users';
import User from '../models/User';

const router = express.Router();

const newUsersController = new UsersController(User);

router.get('/', (req, res) => newUsersController.getAll(req, res));
router.get('/:id', (req, res) => newUsersController.getById(req, res));
router.post('/', (req, res)=> newUsersController.store(req, res));
router.put('/:id', (req, res)=> newUsersController.edit(req, res));
router.delete('/:id', (req, res) => newUsersController.deleteOne(req, res));

export default router;