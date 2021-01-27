"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ReviewsController {
  constructor(Book) {
    this.Book = Book; // this.Review = Review;
  }

  async getById(req, res) {
    const {
      book_id
    } = req.params;

    try {
      const book = await this.Book.findByPk(book_id, {
        include: {
          association: 'reviews'
        }
      });
      return res.send(book);
    } catch (err) {
      console.log('err.message', err.message);
      res.status(400).send(err.message);
    }
  } // async store(req, res){
  //     try {
  //         const review = await this.Review.create(req.body)
  //         res.status(201).send(review);
  //     } catch (err){
  //         res.status(422).send(err);
  //     }
  // }
  // async edit(req, res){
  //     try{
  //         const {name, author, genre} = req.body;
  //         const {id} = req.params;
  //         await this.Review.update({name, author, genre}, {
  //             where: {
  //                 id: id
  //             }
  //         });
  //         return res.sendStatus(200);
  //     } catch(err){
  //         res.status(422).send(err.message);
  //     }
  // }
  // async deleteOne(req, res){
  //     try{
  //         const {id} = req.params;
  //         await this.Review.destroy({
  //             where: {
  //                 id: id
  //             }
  //         });
  //         res.sendStatus(204);
  //     }catch(err){
  //         res.status(400).send(err.message);
  //     }
  // }


}

;
var _default = ReviewsController;
exports.default = _default;