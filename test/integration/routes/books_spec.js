import { expect } from 'chai';
import supertest from 'supertest';
import Book from '../../../src/models/Book';

describe('ROUTE: Books', () => {
  const anotherBook = {
    id: '931f544b-fd60-447f-989f-d0739f0b5710',
    name: 'Disgrace',
    author: 'Coeztzee',
    genre: 'pipoca',
    updatedAt: '2021-01-05T19:20:57.395Z',
    createdAt: '2021-01-05T19:20:57.395Z',
  };

  const defaultId = '931f544b-fd60-447f-989f-d0739f0b5715';

  const defaultBook = {
    name: 'The Price of Salt',
    author: 'Patricia Highsmith',
    genre: 'Romance, Drama',
  };

  const expectedBook = {
    id: defaultId,
    name: 'The Price of Salt',
    author: 'Patricia Highsmith',
    genre: 'Romance, Drama',
  };

  beforeEach(async () => {
    await Book.destroy({ where: {}, force: true });

    const book = new Book(defaultBook);
    book.id = '931f544b-fd60-447f-989f-d0739f0b5715';
    return await book.save();
  });

  afterEach(async () => await Book.destroy({ where: {}, force: true }));

  describe('GET /BOOKS:', () => {
    it('should return a list of books', (done) => {
      request.get('/books').end((err, res) => {
        // expect(res.body).to.eql([expectedBook]);
        expect(res.body)
          .excluding(['createdAt', 'updatedAt'])
          .to.eql([expectedBook]);
        // ver a diferença na documentação entre to.eql e to.deep.equal!!!
        // expect([expectedBook]).excluding(['createdAt', 'updatedAt']).to.deep.equal(res.body);
        done(err);
      });
    });
    context('when an Id is specified', (done) => {
      it('should return a specific book with status 200', (done) => {
        request.get(`/books/${defaultId}`).end((err, res) => {
          expect(res.statusCode).to.eql(200);
          expect(res.body)
            .excluding(['createdAt', 'updatedAt'])
            .to.eql(expectedBook);
          done(err);
        });
      });
    });
  });

  describe('POST /BOOKS:', () => {
    context('when posting a book', () => {
      it('should return a new book with status code 201', (done) => {
        const customId = '931f544b-fd60-447f-989f-d0739f0b5725';
        const newBook = Object.assign({}, { id: customId }, defaultBook);
        const expectedSavedBook = {
          // id: customId,
          name: 'The Price of Salt',
          author: 'Patricia Highsmith',
          genre: 'Romance, Drama',
        };
        request
          .post('/books')
          .send(newBook)
          .end((err, res) => {
            expect(res.statusCode).to.eql(201);
            expect(res.body)
              .excluding(['id', 'createdAt', 'updatedAt'])
              .to.eql(expectedSavedBook);
            done(err);
          });
      });
    });
  });

  describe('PUT /BOOKS/:id :', () => {
    context('When editing a book', () => {
      it('should update the book and return 200 as status code', (done) => {
        const customBook = {
          name: 'The year of yes',
        };
        const updatedBook = Object.assign({}, customBook, defaultBook);

        request
          .put(`/books/${defaultId}`)
          .send(updatedBook)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done(err);
          });
      });
    });
  });

  describe('DELETE /BOOKS:', () => {
    context('when deleting a book', () => {
      it('should delete a book with a given id and return 204 as status code', (done) => {
        request.delete(`/books/${defaultId}`).end((err, res) => {
          expect(res.status).to.eql(204);
          done(err);
        });
      });
    });
  });
});
