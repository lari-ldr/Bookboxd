const BooksController = require('../../../src/controllers/books');
const Book = require('../../../src/models/Book');
const sinon = require('sinon');
const { expect } = require('chai');

describe('CONTROLLERS: BOOKS', ()=>{

    const defaultBook = [{
        name: "The Price of Salt",
        author: "Patricia Highsmith",
        genre: "Romance, Drama"
    }];

    const defaultRequest = {
        params: {}
    };

    describe('GET() ALL BOOKS:', ()=>{
        it('should return a list of books', async ()=>{
            const response = {
                send: sinon.spy()
            };
            
            Book.findAll = sinon.stub();
            Book.findAll.withArgs().resolves(defaultBook);

            const bookController = new BooksController(Book);
            await bookController.getAll(defaultRequest, response);

            sinon.assert.calledWith(response.send, defaultBook);

        });
        it('should return 400 when an error occurs', async()=>{
            const request = {};
            const response = {
                send: sinon.spy(),
                status: sinon.stub()
            };
            response.status.withArgs(400).returns(response);
            Book.findAll = sinon.stub();
            Book.findAll.withArgs().rejects({message: 'Error'});

            const bookController = new BooksController(Book);
            await bookController.getAll(request, response);
            sinon.assert.calledWith(response.send, 'Error');
        })
    });

    describe('GET-BY-ID() A BOOK:', ()=>{
        it('should call send with one book', async()=>{
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
            Book.findOne = sinon.stub();
            Book.findOne.withArgs({ where: { id: fakeId } }).resolves(defaultBook);

            const bookController = new BooksController(Book);
            await bookController.getById(request, response);

            sinon.assert.calledWith(response.send, defaultBook);
        });
    });

    describe('STORE() A BOOK:', ()=>{
        it('should save a new book successfully', async ()=>{
            const requestWithBody = Object.assign(
                {},
                { body: defaultBook[0] },
                defaultRequest
            );

            const response = {
                send: sinon.spy(),
                status: sinon.stub()
            };

            Book.create = sinon.stub();
            Book.create.withArgs().resolves()
        
            response.status.withArgs(201).returns(response);


            const bookController = new BooksController(Book);
            await bookController.store(requestWithBody, response);

            sinon.assert.calledWith(response.send);

        });

        context('when an error occurs', ()=>{
            it('should return 422', async ()=>{
                const response = {
                    send: sinon.spy(),
                    status: sinon.stub()
                  };

                  Book.create = sinon.stub();
                  Book.create.withArgs().rejects({message: 'Error'});
          
                  response.status.withArgs(422).returns(response);
                
          
                  const booksController = new BooksController(Book);
          
                  await booksController.store(defaultRequest, response); //TypeError: this.Book.create is not a function
                  sinon.assert.calledWith(response.status, 422);
            });
        });
    });


    describe('UPDATE() A BOOK:', ()=>{
        it('should respond with 200 when the product has been updated', async()=>{
            const fakeId = 'a-fake-id';
            const updatedBook = {
                id: fakeId,
                name: "The Price of Salt",
                author: "Patricia Highsmith",
                genre: "Romance, Drama"
            };
            const request = {
                params: {
                    id: fakeId
                },
                body: updatedBook
            };
            const response = {
                sendStatus: sinon.spy()
            }

            // class fakeBook{
            //     static update(){}
            // }
            Book.update = sinon.stub();
            Book.update.withArgs({id: fakeId}, updatedBook).resolves(updatedBook);

            // const updateOneStub = sinon.stub(fakeBook, 'update');

            // updateOneStub.withArgs({id: fakeId}, updatedBook).resolves(updatedBook);

            const bookController = new BooksController(Book);

            await bookController.edit(request, response);

            sinon.assert.calledWith(response.sendStatus, 200);
        });
        context('when an error occurs', ()=>{
            it('should return 422', async()=>{
                const fakeId = 'a-fake-id';
                const updatedBook = {
                    id: fakeId,
                    name: "The Price of Salt",
                    author: "Patricia Highsmith",
                    genre: "Romance, Drama"
                };

                const request = {
                    params: {
                        id: fakeId
                    },
                    body: updatedBook
                };

                const response = {
                    send: sinon.spy(),
                    status: sinon.stub()
                    };                    

                Book.update = sinon.stub();
                
                // Book.update
                // .withArgs({ id: fakeId }, updatedBook)
                // .rejects({ message: 'Error' });

                Book.update
                .withArgs()
                .rejects({ message: 'Error' });

                response.status.withArgs(422).returns(response);

                const bookController = new BooksController(Book);

                await bookController.edit(request, response);
                sinon.assert.calledWith(response.send, 'Error');
                // sinon.assert.calledWith(response.send, 'res.sendStatus is not a function');
            });
        });
    });

    describe('DELETE() A BOOK:', ()=>{
        it('should respond with 204 when the book has been deleted', async()=>{
            const fakeId = 'a-fake-id';
            const request = {
                params: {
                    id: fakeId
                }
            };
            const response = {
                sendStatus: sinon.spy()
            };

            Book.destroy = sinon.stub();
            Book.destroy.withArgs({id: fakeId}).resolves([1]);

            const bookController = new BooksController(Book);
            await bookController.deleteOne(request, response);
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

                Book.destroy = sinon.stub();
                
                Book.destroy
                .withArgs()
                .rejects({message: 'Error'});

                // Book.destroy
                // .withArgs({id: fakeId})
                // .rejects({message: 'Error'});

                response.status.withArgs(400).returns(response);

                const bookController = new BooksController(Book);
                await bookController.deleteOne(request, response);
                sinon.assert.calledWith(response.send, 'Error');
            });
        });
    });
});