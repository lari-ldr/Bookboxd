"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _Reviews = _interopRequireDefault(require("../controllers/Reviews"));

var _Book = _interopRequireDefault(require("../models/Book"));

var _Review = _interopRequireDefault(require("../models/Review"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

const newReviewController = new _Reviews.default(_Book.default);
router.get('/:book_id/reviews', (req, res) => newReviewController.getById(req, res));
router.post('/:book_id/reviews', (req, res) => newReviewController.store(req, res));
router.put('/:book_id/reviews/:review_id', (req, res) => newReviewController.edit(req, res));
router.delete('/:book_id/reviews', (req, res) => newReviewController.deleteOne(req, res));
var _default = router;
exports.default = _default;