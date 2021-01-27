"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _books = _interopRequireDefault(require("./books"));

var _users = _interopRequireDefault(require("./users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// responsável por carregar todas as rotas da aplicação
const router = _express.default.Router();

router.use('/books', _books.default);
router.use('/users', _users.default);
router.get('/', (req, res) => res.send('A simple API for book lovers ;)'));
var _default = router;
exports.default = _default;