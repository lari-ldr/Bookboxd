"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class UsersController {
  constructor(User) {
    this.User = User;
  }

  async getAll(req, res) {
    try {
      const users = await this.User.findAll({});
      return res.send(users);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async getById(req, res) {
    const {
      id
    } = req.params;

    try {
      const user = await this.User.findOne({
        where: {
          id: id
        }
      });
      return res.send(user);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async store(req, res) {
    try {
      const user = await this.User.create(req.body);
      res.status(201).send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  }

  async edit(req, res) {
    try {
      const {
        name,
        author,
        genre
      } = req.body;
      const {
        id
      } = req.params;
      await this.User.update({
        name,
        author,
        genre
      }, {
        where: {
          id: id
        }
      });
      return res.sendStatus(200);
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async deleteOne(req, res) {
    try {
      const {
        id
      } = req.params;
      await this.User.destroy({
        where: {
          id: id
        }
      });
      res.sendStatus(204);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

}

;
var _default = UsersController;
exports.default = _default;