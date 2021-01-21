class BooksController{
    constructor(Book){
        this.Book = Book;
    }

    async getAll(req, res){
        try {
            const books = await this.Book.findAll({});
            return res.send(books);
        } catch(err){
            res.status(400).send(err.message);
        }
    }

    async getById(req, res){
        const {id} = req.params;
        try {
            const book = await this.Book.findOne({ where: { id: id } });
            return res.send(book);
        } catch(err){
            res.status(400).send(err.message);
        }
    }

    async store(req, res){
        try {
            const book = await this.Book.create(req.body)
            res.status(201).send(book);
        } catch (err){
            res.status(422).send(err);
        }
    }

    async edit(req, res){
        try{
            const {name, author, genre} = req.body;
            const {id} = req.params;
            await this.Book.update({name, author, genre}, {
                where: {
                    id: id
                }
            });
            return res.sendStatus(200);
        } catch(err){
            res.status(422).send(err.message);
        }
    }

    async deleteOne(req, res){
        try{
            const {id} = req.params;
            await this.Book.destroy({
                where: {
                    id: id
                }
            });
            res.sendStatus(204);
        }catch(err){
            res.status(400).send(err.message);
        }
    }
};

export default BooksController;