"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Books = _interopRequireDefault(require("../controllers/Books"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// responsável por carregar todas as rotas da aplicação
// import Book from '../models/Book';
// const Book = require('../models').Book;
const router = _express.default.Router();

const newBooksController = new _Books.default(_models.Book);
router.get('/', (req, res) => newBooksController.getAll(req, res));
router.get('/:id', (req, res) => newBooksController.getById(req, res));
router.post('/', (req, res) => newBooksController.store(req, res));
router.put('/:id', (req, res) => newBooksController.edit(req, res));
router.delete('/:id', (req, res) => newBooksController.deleteOne(req, res));
var _default = router;
exports.default = _default;