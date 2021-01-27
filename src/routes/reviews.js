import express from 'express';
import ReviewsController from '../controllers/Reviews';
import Book from '../models/Book';
import Review from '../models/Review';

const router = express.Router();

const newReviewController = new ReviewsController(Book);

router.get('/:book_id/reviews', (req, res) => newReviewController.getById(req, res));
router.post('/:book_id/reviews', (req, res)=> newReviewController.store(req, res));
router.put('/:book_id/reviews/:review_id', (req, res)=> newReviewController.edit(req, res));
router.delete('/:book_id/reviews', (req, res) => newReviewController.deleteOne(req, res));

export default router;