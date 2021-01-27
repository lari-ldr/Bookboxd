import ListsController from '../../../src/controllers/Lists';
import List from '../../../src/models/List';
import sinon from 'sinon';
import { expect } from 'chai';

describe('CONTROLLERS: LISTS', ()=>{

    const defaultList = [{
        user_id: '931f544b-fd60-447f-989f-d0739f0b5720',
        Title: 'Seen in 2021'
    }];

    const defaultRequest = {
        params: {}
    };

    describe('GET() ALL LISTS:', ()=>{
        it('should return an array of lists', async ()=>{
            const response = {
                send: sinon.spy()
            };
            
            List.findAll = sinon.stub();
            List.findAll.withArgs().resolves(defaultList);

            const listController = new ListsController(List);
            await listController.getAll(defaultRequest, response);

            sinon.assert.calledWith(response.send, defaultList);

        });
        it('should return 400 when an error occurs', async()=>{
            const request = {};
            const response = {
                send: sinon.spy(),
                status: sinon.stub().returnsThis()
            };
            response.status.withArgs(400).returns(response);
            List.findAll = sinon.stub();
            List.findAll.withArgs().rejects({message: 'Error'});

            const listController = new ListsController(List);
            await listController.getAll(request, response);
            sinon.assert.calledWith(response.send, 'Error');
        })
    });

    describe('GET-BY-ID() A LIST:', ()=>{
        it('should call send with one list', async()=>{
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
            List.findOne = sinon.stub();
            List.findOne.withArgs({ where: { id: fakeId } }).resolves(defaultList);

            const listController = new ListsController(List);
            await listController.getById(request, response);

            sinon.assert.calledWith(response.send, defaultList);
        });
    });

    describe('STORE() A LIST:', ()=>{
        it('should save a new list successfully', async ()=>{
            const requestWithBody = Object.assign(
                {},
                { body: defaultList[0] },
                defaultRequest
            );

            const response = {
                send: sinon.spy(),
                status: sinon.stub().returnsThis()
            };

            List.create = sinon.stub();
            List.create.withArgs().resolves()
        
            response.status.withArgs(201).returns(response);


            const listController = new ListsController(List);
            await listController.store(requestWithBody, response);

            sinon.assert.calledWith(response.send);

        });

        context('when an error occurs', ()=>{
            it('should return 422', async ()=>{
                const response = {
                    send: sinon.spy(),
                    status: sinon.stub().returnsThis()
                  };

                  List.create = sinon.stub();
                  List.create.withArgs().rejects({message: 'Error'});
          
                  response.status.withArgs(422).returns(response);
                
          
                  const listController = new ListsController(List);
          
                  await listController.store(defaultRequest, response); //TypeError: this.List.create is not a function
                  sinon.assert.calledWith(response.status, 422);
            });
        });
    });


    describe('UPDATE() A LIST:', ()=>{
        it('should respond with 200 when the list has been updated', async()=>{
            const fakeId = 'a-fake-id';
            const updatedList = {
                id: fakeId,
                user_id: '931f544b-fd60-447f-989f-d0739f0b5720',
                Title: 'Seen in 2000'
            };
            const request = {
                params: {
                    id: fakeId
                },
                body: updatedList
            };
            const response = {
                sendStatus: sinon.spy()
            }

            // class fakeList{
            //     static update(){}
            // }
            List.update = sinon.stub();
            List.update.withArgs({id: fakeId}, updatedList).resolves(updatedList);

            // const updateOneStub = sinon.stub(fakeList, 'update');

            // updateOneStub.withArgs({id: fakeId}, updatedList).resolves(updatedList);

            const listController = new ListsController(List);

            await listController.edit(request, response);

            sinon.assert.calledWith(response.sendStatus, 200);
        });
        context('when an error occurs', ()=>{
            it('should return 422', async()=>{
                const fakeId = 'a-fake-id';
                const updatedList = {
                    id: fakeId,
                    user_id: '931f544b-fd60-447f-989f-d0739f0b5720',
                    Title: 'Seen in 2000'
                };

                const request = {
                    params: {
                        id: fakeId
                    },
                    body: updatedList
                };

                const response = {
                    send: sinon.spy(),
                    status: sinon.stub().returnsThis()
                    };                    

                List.update = sinon.stub();
                
                // List.update
                // .withArgs({ id: fakeId }, updatedList)
                // .rejects({ message: 'Error' });

                List.update
                .withArgs()
                .rejects({ message: 'Error' });

                response.status.withArgs(422).returns(response);

                const listController = new ListsController(List);

                await listController.edit(request, response);
                sinon.assert.calledWith(response.send, 'Error');
                // sinon.assert.calledWith(response.send, 'res.sendStatus is not a function');
            });
        });
    });

    describe('DELETE() A LIST:', ()=>{
        it('should respond with 204 when the list has been deleted', async()=>{
            const fakeId = 'a-fake-id';
            const request = {
                params: {
                    id: fakeId
                }
            };
            const response = {
                sendStatus: sinon.spy()
            };

            List.destroy = sinon.stub();
            List.destroy.withArgs({id: fakeId}).resolves([1]);

            const listController = new ListsController(List);
            await listController.deleteOne(request, response);
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

                List.destroy = sinon.stub();
                
                List.destroy
                .withArgs()
                .rejects({message: 'Error'});

                // List.destroy
                // .withArgs({id: fakeId})
                // .rejects({message: 'Error'});

                response.status.withArgs(400).returns(response);

                const listController = new ListsController(List);
                await listController.deleteOne(request, response);
                sinon.assert.calledWith(response.send, 'Error');
            });
        });
    });
});