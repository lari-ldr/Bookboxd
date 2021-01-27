import { expect } from "chai";
import supertest from "supertest";
import Book from "../../../src/models/Book";
import Review from "../../../src/models/Review";
import User from '../../../src/models/User';

describe('ROUTE: REVIEWS', ()=>{
    const defaultIdReview = "107f544b-fd60-447f-989f-d0739f0b5715";
    const defaultIdBook = "931f544b-fd60-447f-989f-d0739f0b5715";
    const defaultIdUser = "931f544b-fd60-447f-989f-d0739f0b5720";
    const defaultUser = {
        first_name: "Julia",
        last_name: "Garner",
        username: "RuthOzark",
        email: "julia.garner@gmail.com"
    };

    const defaultReviewsOfABook = {
            name: 'The Price of Salt',
            author: 'Patricia Highsmith',
            genre: 'Romance, Drama',
            reviews: [
                {
                    user_id: '931f544b-fd60-447f-989f-d0739f0b5720',
                    book_id: '931f544b-fd60-447f-989f-d0739f0b5715',
                    critique: 'Amazing Book',
                    rating: '5'
                }
            ]
    };
    const expectedReviewsOfABook = {
        id: defaultIdBook,
        name: 'The Price of Salt',
        author: 'Patricia Highsmith',
        genre: 'Romance, Drama',
        reviews: [
            {
                id: defaultIdReview,
                user_id: '931f544b-fd60-447f-989f-d0739f0b5720',
                book_id: defaultIdBook,
                critique: 'Amazing Book',
                rating: '5'
            }
        ]
};

const defaultBook = {
    name: 'The Price of Salt',
    author: 'Patricia Highsmith',
    genre: 'Romance, Drama'
};
    // const defaultReview = [{
    //     // user_id: '931f544b-fd60-447f-989f-d0739f0b5720',
    //     // book_id: '931f544b-fd60-447f-989f-d0739f0b5715',
    //     critique: 'Amazing Book',
    //     rating: '5'
    // }];

    const defaultReview = {
        critique: 'Amazing Book',
        rating: '5'
    };

    // const expectedReview = {
    //     id: defaultId,
    //     user_id: '931f544b-fd60-447f-989f-d0739f0b5720',
    //     book_id: '931f544b-fd60-447f-989f-d0739f0b5715',
    //     critique: 'Amezing Book',
    //     rating: '5'
    // };

    beforeEach(async ()=>{
        await Book.destroy({ where: {}, force: true });
        await Review.destroy({ where: {}, force: true });
        await User.destroy({ where: {}, force: true });

        // um usuario cria um review referente a um livro

        // criamos um usuario
        const user = await new User(defaultUser);
        user.id = defaultIdUser;
        user.save();
        // console.log('user', user);

        // criamos um livro
        const book = await new Book(defaultBook);
        book.id = defaultIdBook;
        // book.save();
        // console.log('book', book);

        // criamos um review
        const review = await new Review(defaultReview)
        review.id = defaultIdReview;
        review.user_id = defaultIdUser;
        review.book_id = defaultIdBook;
        review.save();
        // console.log('review', review)
        
        return book.save();
    });

    afterEach(async ()=> {
        await Book.destroy({ where: {}, force: true });
        // await Review.destroy({ where: {}, force: true });
        // await User.destroy({ where: {}, force: true });
    });

    describe('GET /BOOKS/REVIEWS:', ()=>{
        // it('should return a list of reviews', done =>{
        //     request.get('/reviews').end((err, res)=>{
        //         // expect(res.body).to.eql([expectedReview]);
        //         expect(res.body).excluding(['createdAt', 'updatedAt']).to.eql([expectedReview]);
        //         // ver a diferença na documentação entre to.eql e to.deep.equal!!!
        //         // expect([expectedReview]).excluding(['createdAt', 'updatedAt']).to.deep.equal(res.body);
        //         done(err);
        //     });
        // });
        context.only('when a BOOK ID is specified', done =>{
            it('should return all reviews of a book with status 200', done =>{
                request.get(`/books/${defaultIdBook}/reviews`).end((err, res)=>{
                    expect(res.statusCode).to.eql(200);
                    console.log('res.body', res.body);
                    expect(res.body).excluding(['createdAt', 'updatedAt']).to.eql(expectedReviewsOfABook);
                    done(err);
                });
            });
        });
    });

    describe('POST /REVIEWS:', ()=>{
        context('when posting a review', ()=>{
            it('should return a new review with status code 201', done =>{
                const customId = "107f544b-fd60-447f-989f-d0739f0b5715";
                const newReview = Object.assign({}, {id: customId}, defaultReview);
                const expectedSavedReview = {
                    user_id: '931f544b-fd60-447f-989f-d0739f0b5720',
                    book_id: '931f544b-fd60-447f-989f-d0739f0b5715',
                    critique: 'Amazing Book',
                    rating: '5'
                };
                request
                .post('/reviews')
                .send(newReview)
                .end((err,res)=>{
                    expect(res.statusCode).to.eql(201);
                    expect(res.body).excluding(['id', 'createdAt', 'updatedAt']).to.eql(expectedSavedReview);
                    done(err);
                });
            });
        });
    });

    describe('PUT /REVIEWS/:id :', ()=>{
        context('When editing a review', ()=>{
            it('should update the review and return 200 as status code', done => {
                const customReview = {
                    critique: 'Awful Book',
                };
                const updatedReview = Object.assign({}, customReview, defaultReview);

                request
                .put(`/reviews/${defaultId}`)
                .send(updatedReview)
                .end((err, res)=>{
                    expect(res.status).to.eql(200);
                    done(err);
                });
            });
        });
    });

    describe('DELETE /REVIEWS:', ()=>{
        context('when deleting a review', ()=>{
            it('should delete a review with a given id and return 204 as status code', done =>{
                request
                .delete(`/reviews/${defaultId}`)
                .end((err, res)=>{
                    expect(res.status).to.eql(204);
                    done(err);
                });
            });
        });
    });
});