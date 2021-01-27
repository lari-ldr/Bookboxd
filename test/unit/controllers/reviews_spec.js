import ReviewsController from '../../../src/controllers/Reviews';
import Review from '../../../src/models/Review';
import sinon from 'sinon';
import { expect } from 'chai';

describe('CONTROLLERS: REVIEWS', ()=>{

    const defaultReview = [{
        user_id: '931f544b-fd60-447f-989f-d0739f0b5720',
        book_id: '931f544b-fd60-447f-989f-d0739f0b5715',
        critique: 'Amazing Book',
        rating: '5'
    }];

    const defaultRequest = {
        params: {}
    };

    describe('GET() ALL REVIEWS:', ()=>{
        it('should return a list of reviews', async ()=>{
            const response = {
                send: sinon.spy()
            };
            
            Review.findAll = sinon.stub();
            Review.findAll.withArgs().resolves(defaultReview);

            const reviewController = new ReviewsController(Review);
            await reviewController.getAll(defaultRequest, response);

            sinon.assert.calledWith(response.send, defaultReview);

        });
        it('should return 400 when an error occurs', async()=>{
            const request = {};
            const response = {
                send: sinon.spy(),
                status: sinon.stub().returnsThis()
            };
            response.status.withArgs(400).returns(response);
            Review.findAll = sinon.stub();
            Review.findAll.withArgs().rejects({message: 'Error'});

            const reviewController = new ReviewsController(Review);
            await reviewController.getAll(request, response);
            sinon.assert.calledWith(response.send, 'Error');
        })
    });

    describe('GET-BY-ID() A REVIEW:', ()=>{
        it('should call send with one review', async()=>{
            const fakeId = 'a-fake-id';
            const request = {
                params: {
                    id: fakeId
                }
            };
            const response = {
                send: sinon.spy()
            };
            // const response = {
            //     send: [{ author: "Patricia Highsmith", genre: "Romance, Drama", title: "The Price of Salt" }]
            // };
            Review.findOne = sinon.stub();
            Review.findOne.withArgs({ where: { id: fakeId } }).resolves(defaultReview);

            const reviewController = new ReviewsController(Review);
            await reviewController.getById(request, response);

            sinon.assert.calledWith(response.send, defaultReview);
        });
    });

    describe('STORE() A REVIEW:', ()=>{
        it('should save a new review successfully', async ()=>{
            const requestWithBody = Object.assign(
                {},
                { body: defaultReview[0] },
                defaultRequest
            );

            const response = {
                send: sinon.spy(),
                status: sinon.stub().returnsThis()
            };

            Review.create = sinon.stub();
            Review.create.withArgs().resolves()
        
            response.status.withArgs(201).returns(response);


            const reviewController = new ReviewsController(Review);
            await reviewController.store(requestWithBody, response);

            sinon.assert.calledWith(response.send);

        });

        context('when an error occurs', ()=>{
            it('should return 422', async ()=>{
                const response = {
                    send: sinon.spy(),
                    status: sinon.stub().returnsThis()
                  };

                  Review.create = sinon.stub();
                  Review.create.withArgs().rejects({message: 'Error'});
          
                  response.status.withArgs(422).returns(response);
                
          
                  const reviewController = new ReviewsController(Review);
          
                  await reviewController.store(defaultRequest, response); //TypeError: this.Review.create is not a function
                  sinon.assert.calledWith(response.status, 422);
            });
        });
    });


    describe('UPDATE() A REVIEW:', ()=>{
        it('should respond with 200 when the review has been updated', async()=>{
            const fakeId = 'a-fake-id';
            const updatedReview = {
                id: fakeId,
                user_id: '931f544b-fd60-447f-989f-d0739f0b5720',
                book_id: '931f544b-fd60-447f-989f-d0739f0b5715',
                critique: 'Awful Book',
                rating: '2'
            };
            const request = {
                params: {
                    id: fakeId
                },
                body: updatedReview
            };
            const response = {
                sendStatus: sinon.spy()
            }

            // class fakeReview{
            //     static update(){}
            // }
            Review.update = sinon.stub();
            Review.update.withArgs({id: fakeId}, updatedReview).resolves(updatedReview);

            // const updateOneStub = sinon.stub(fakeReview, 'update');

            // updateOneStub.withArgs({id: fakeId}, updatedReview).resolves(updatedReview);

            const reviewController = new ReviewsController(Review);

            await reviewController.edit(request, response);

            sinon.assert.calledWith(response.sendStatus, 200);
        });
        context('when an error occurs', ()=>{
            it('should return 422', async()=>{
                const fakeId = 'a-fake-id';
                const updatedReview = {
                    id: fakeId,
                    first_name: "Julia",
                    last_name: "Garner",
                    username: "RuthOzark",
                    email: "julia.garner@gmail.com"
                };

                const request = {
                    params: {
                        id: fakeId
                    },
                    body: updatedReview
                };

                const response = {
                    send: sinon.spy(),
                    status: sinon.stub().returnsThis()
                    };                    

                Review.update = sinon.stub();
                
                // Review.update
                // .withArgs({ id: fakeId }, updatedReview)
                // .rejects({ message: 'Error' });

                Review.update
                .withArgs()
                .rejects({ message: 'Error' });

                response.status.withArgs(422).returns(response);

                const reviewController = new ReviewsController(Review);

                await reviewController.edit(request, response);
                sinon.assert.calledWith(response.send, 'Error');
                // sinon.assert.calledWith(response.send, 'res.sendStatus is not a function');
            });
        });
    });

    describe('DELETE() A REVIEW:', ()=>{
        it('should respond with 204 when the review has been deleted', async()=>{
            const fakeId = 'a-fake-id';
            const request = {
                params: {
                    id: fakeId
                }
            };
            const response = {
                sendStatus: sinon.spy()
            };

            Review.destroy = sinon.stub();
            Review.destroy.withArgs({id: fakeId}).resolves([1]);

            const reviewController = new ReviewsController(Review);
            await reviewController.deleteOne(request, response);
            sinon.assert.calledWith(response.sendStatus, 204);
        });

        context('when an error occurs', ()=>{
            it('should return 400', async()=>{
                const fakeId = 'a-fake-id';
                const request = {
                    params: {
                        id: fakeId
                    }
                };
                const response = {
                    send: sinon.spy(),
                    status: sinon.stub().returnsThis()
                };

                Review.destroy = sinon.stub();
                
                Review.destroy
                .withArgs()
                .rejects({message: 'Error'});

                // Review.destroy
                // .withArgs({id: fakeId})
                // .rejects({message: 'Error'});

                response.status.withArgs(400).returns(response);

                const reviewController = new ReviewsController(Review);
                await reviewController.deleteOne(request, response);
                sinon.assert.calledWith(response.send, 'Error');
            });
        });
    });
});