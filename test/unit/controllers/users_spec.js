import UsersController from '../../../src/controllers/Users';
import User from '../../../src/models/User';
import sinon from 'sinon';
import { expect } from 'chai';

describe('CONTROLLERS: USERS', () => {
  const defaultUser = [
    {
      first_name: 'Julia',
      last_name: 'Garner',
      username: 'RuthOzark',
      email: 'julia.garner@gmail.com',
    },
  ];

  const defaultRequest = {
    params: {},
  };

  describe('GET() ALL USERS:', () => {
    it('should return a list of users', async () => {
      const response = {
        send: sinon.spy(),
      };

      User.findAll = sinon.stub();
      User.findAll.withArgs().resolves(defaultUser);

      const userController = new UsersController(User);
      await userController.getAll(defaultRequest, response);

      sinon.assert.calledWith(response.send, defaultUser);
    });
    it('should return 400 when an error occurs', async () => {
      const request = {};
      const response = {
        send: sinon.spy(),
        status: sinon.stub().returnsThis(),
      };
      response.status.withArgs(400).returns(response);
      User.findAll = sinon.stub();
      User.findAll.withArgs().rejects({ message: 'Error' });

      const userController = new UsersController(User);
      await userController.getAll(request, response);
      sinon.assert.calledWith(response.send, 'Error');
    });
  });

  describe('GET-BY-ID() A USER:', () => {
    it('should call send with one user', async () => {
      const fakeId = 'a-fake-id';
      const request = {
        params: {
          id: fakeId,
        },
      };
      const response = {
        send: sinon.spy(),
      };

      User.findOne = sinon.stub();
      User.findOne.withArgs({ where: { id: fakeId } }).resolves(defaultUser);

      const userController = new UsersController(User);
      await userController.getById(request, response);

      sinon.assert.calledWith(response.send, defaultUser);
    });
  });

  describe('STORE() A USER:', () => {
    it('should save a new user successfully', async () => {
      const requestWithBody = Object.assign(
        {},
        { body: defaultUser[0] },
        defaultRequest
      );

      const response = {
        send: sinon.spy(),
        status: sinon.stub().returnsThis(),
      };

      User.create = sinon.stub();
      User.create.withArgs().resolves();

      response.status.withArgs(201).returns(response);

      const userController = new UsersController(User);
      await userController.store(requestWithBody, response);

      sinon.assert.calledWith(response.send);
    });

    context('when an error occurs', () => {
      it('should return 422', async () => {
        const response = {
          send: sinon.spy(),
          status: sinon.stub().returnsThis(),
        };

        User.create = sinon.stub();
        User.create.withArgs().rejects({ message: 'Error' });

        response.status.withArgs(422).returns(response);

        const usersController = new UsersController(User);

        await usersController.store(defaultRequest, response); //TypeError: this.User.create is not a function
        sinon.assert.calledWith(response.status, 422);
      });
    });
  });

  describe('UPDATE() A USER:', () => {
    it('should respond with 200 when the user has been updated', async () => {
      const fakeId = 'a-fake-id';
      const updatedUser = {
        id: fakeId,
        first_name: 'Julia',
        last_name: 'Garner',
        username: 'RuthOzark',
        email: 'julia.garner@gmail.com',
      };
      const request = {
        params: {
          id: fakeId,
        },
        body: updatedUser,
      };
      const response = {
        sendStatus: sinon.spy(),
      };

      // class fakeUser{
      //     static update(){}
      // }
      User.update = sinon.stub();
      User.update.withArgs({ id: fakeId }, updatedUser).resolves(updatedUser);

      // const updateOneStub = sinon.stub(fakeUser, 'update');

      // updateOneStub.withArgs({id: fakeId}, updatedUser).resolves(updatedUser);

      const userController = new UsersController(User);

      await userController.edit(request, response);

      sinon.assert.calledWith(response.sendStatus, 200);
    });
    context('when an error occurs', () => {
      it('should return 422', async () => {
        const fakeId = 'a-fake-id';
        const updatedUser = {
          id: fakeId,
          first_name: 'Julia',
          last_name: 'Garner',
          username: 'RuthOzark',
          email: 'julia.garner@gmail.com',
        };

        const request = {
          params: {
            id: fakeId,
          },
          body: updatedUser,
        };

        const response = {
          send: sinon.spy(),
          status: sinon.stub().returnsThis(),
        };

        User.update = sinon.stub();

        // User.update
        // .withArgs({ id: fakeId }, updatedUser)
        // .rejects({ message: 'Error' });

        User.update.withArgs().rejects({ message: 'Error' });

        response.status.withArgs(422).returns(response);

        const userController = new UsersController(User);

        await userController.edit(request, response);
        sinon.assert.calledWith(response.send, 'Error');
        // sinon.assert.calledWith(response.send, 'res.sendStatus is not a function');
      });
    });
  });

  describe('DELETE() A USER:', () => {
    it('should respond with 204 when the user has been deleted', async () => {
      const fakeId = 'a-fake-id';
      const request = {
        params: {
          id: fakeId,
        },
      };
      const response = {
        sendStatus: sinon.spy(),
      };

      User.destroy = sinon.stub();
      User.destroy.withArgs({ id: fakeId }).resolves([1]);

      const userController = new UsersController(User);
      await userController.deleteOne(request, response);
      sinon.assert.calledWith(response.sendStatus, 204);
    });

    context('when an error occurs', () => {
      it('should return 400', async () => {
        const fakeId = 'a-fake-id';
        const request = {
          params: {
            id: fakeId,
          },
        };
        const response = {
          send: sinon.spy(),
          status: sinon.stub().returnsThis(),
        };

        User.destroy = sinon.stub();

        User.destroy.withArgs().rejects({ message: 'Error' });

        // User.destroy
        // .withArgs({id: fakeId})
        // .rejects({message: 'Error'});

        response.status.withArgs(400).returns(response);

        const userController = new UsersController(User);
        await userController.deleteOne(request, response);
        sinon.assert.calledWith(response.send, 'Error');
      });
    });
  });
});
