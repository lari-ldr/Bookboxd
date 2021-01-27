"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Users = _interopRequireDefault(require("../controllers/Users"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

const newUsersController = new _Users.default(_User.default);
router.get('/', (req, res) => newUsersController.getAll(req, res));
router.get('/:id', (req, res) => newUsersController.getById(req, res));
router.post('/', (req, res) => newUsersController.store(req, res));
router.put('/:id', (req, res) => newUsersController.edit(req, res));
router.delete('/:id', (req, res) => newUsersController.deleteOne(req, res));
var _default = router;
exports.default = _default;