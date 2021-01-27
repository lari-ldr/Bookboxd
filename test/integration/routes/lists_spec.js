import { expect } from "chai";
import supertest from "supertest";
import List from "../../../src/models/List";

describe('ROUTE: LISTS', ()=>{
    const defaultId = "567f377b-fd60-447f-989f-d0739f0b5715";

    const defaultList = {
        user_id: '931f544b-fd60-447f-989f-d0739f0b5720',
        Title: 'Seen in 2021'
    };

    const expectedList = {
        id: defaultId,
        user_id: '931f544b-fd60-447f-989f-d0739f0b5720',
        Title: 'Seen in 2021'
    };

    beforeEach(async ()=>{
        await List.destroy({ where: {}, force: true });

        const list = new List(defaultList);
        list.id  = "567f377b-fd60-447f-989f-d0739f0b5715";
        return await list.save();
    });

    afterEach(async ()=> await List.destroy({ where: {}, force: true }));

    describe('GET /LISTS:', ()=>{
        it('should return an array of lists', done =>{
            request.get('/lists').end((err, res)=>{
                // expect(res.body).to.eql([expectedList]);
                expect(res.body).excluding(['createdAt', 'updatedAt']).to.eql([expectedList]);
                // ver a diferença na documentação entre to.eql e to.deep.equal!!!
                // expect([expectedList]).excluding(['createdAt', 'updatedAt']).to.deep.equal(res.body);
                done(err);
            });
        });
        context('when an Id is specified', done =>{
            it('should return a specific list with status 200', done =>{
                request.get(`/lists/${defaultId}`).end((err, res)=>{
                    expect(res.statusCode).to.eql(200);
                    expect(res.body).excluding(['createdAt', 'updatedAt']).to.eql(expectedList);
                    done(err);
                });
            });
        });
    });

    describe('POST /LISTS:', ()=>{
        context('when posting a list', ()=>{
            it('should return a new list with status code 201', done =>{
                const customId = "567f377b-fd60-447f-989f-d0739f0b5715";
                const newList = Object.assign({}, {id: customId}, defaultList);
                const expectedSavedList = {
                    user_id: '931f544b-fd60-447f-989f-d0739f0b5720',
                    Title: 'Seen in 2021'
                };
                request
                .post('/lists')
                .send(newList)
                .end((err,res)=>{
                    expect(res.statusCode).to.eql(201);
                    expect(res.body).excluding(['id', 'createdAt', 'updatedAt']).to.eql(expectedSavedList);
                    done(err);
                });
            });
        });
    });

    describe('PUT /LISTS/:id :', ()=>{
        context('When editing a list', ()=>{
            it('should update the list and return 200 as status code', done => {
                const customList = {
                    Title: 'Seen in 2000'
                };
                const updatedList = Object.assign({}, customList, defaultList);

                request
                .put(`/lists/${defaultId}`)
                .send(updatedList)
                .end((err, res)=>{
                    expect(res.status).to.eql(200);
                    done(err);
                });
            });
        });
    });

    describe('DELETE /LISTS:', ()=>{
        context('when deleting a list', ()=>{
            it('should delete a list with a given id and return 204 as status code', done =>{
                request
                .delete(`/lists/${defaultId}`)
                .end((err, res)=>{
                    expect(res.status).to.eql(204);
                    done(err);
                });
            });
        });
    });
});