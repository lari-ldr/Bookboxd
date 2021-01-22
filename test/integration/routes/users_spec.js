import { expect } from "chai";
import supertest from "supertest";
import User from "../../../src/models/User";

describe('ROUTES: USERS', ()=>{
    const defaultId = "931f544b-fd60-447f-989f-d0739f0b5720";
    const defaultUser = {
        first_name: "Julia",
        last_name: "Garner",
        username: "RuthOzark",
        email: "julia.garner@gmail.com"
    };
    const expectedUser = {
        id: defaultId,
        first_name: "Julia",
        last_name: "Garner",
        username: "RuthOzark",
        email: "julia.garner@gmail.com"
    };

    beforeEach(async ()=>{
        await User.destroy({where: {}, force: true});
        const user = new User(defaultUser);
        user.id = "931f544b-fd60-447f-989f-d0739f0b5720";
        return await user.save();
    });

    afterEach(async ()=> await User.destroy({ where: {}, force: true }));

    describe('GET /USERS:', ()=>{
        it('should return a list of users', done=>{
            request.get('/users')
            .end((err, res)=>{
                expect(res.body).excluding(['createdAt', 'updatedAt']).to.be.eql([expectedUser]);
                done(err);
            });
        });
        context('When an ID is specified:', done=>{
            it('should return a specific user with status 200', done=>{
                request.get(`/users/${defaultId}`)
                .end((err,res)=>{
                    expect(res.body).excluding(['createdAt', 'updatedAt']).to.be.eql(expectedUser);
                    expect(res.statusCode).to.be.eql(200);
                    done(err);
                });
            });
        });
    });
    describe('POST /USERS', ()=>{
        context('When posting a new user:', ()=>{
            it('should store a new user and return status 201', done=>{
                const customId = "931f544b-fd60-447f-989f-d0739f0b5839";
                const newUser = Object.assign({}, {id: customId}, defaultUser);
                const expectedSavedUser = {
                    first_name: "Julia",
                    last_name: "Garner",
                    username: "RuthOzark",
                    email: "julia.garner@gmail.com"
                };
                request.post(`/users/`)
                .send(newUser)
                .end((err,res)=>{
                    expect(res.body).excluding(['id', 'createdAt', 'updatedAt']).to.be.eql(expectedSavedUser);
                    expect(res.statusCode).to.be.eql(201);
                    done(err);
                });
            });
        })
    });
    describe('PUT /USERS:', ()=>{
        context('When editing a user:', ()=>{
            it('should updated a existing user and return a status 200', done=>{
                const customUser = {username: 'TheAmericans'}
                const updatedUser = Object.assign({}, customUser, defaultUser)

                request.put(`/users/${defaultId}`)
                .send(updatedUser)
                .end((err, res)=>{
                    expect(res.statusCode).to.be.eql(200);
                    done(err);
                });
            });
        });
    });
    describe('DELETE /USERS:', ()=>{
        context('When deleting a user:', ()=>{
            it('should delete a user with the given Id and return status 204', done=>{
                request.delete(`/users/${defaultId}`)
                .end((err, res)=>{
                    expect(res.statusCode).to.be.eql(204);
                    done(err);
                });
            });
        });
    });
})