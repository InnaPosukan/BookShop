const uuid = require('uuid');
const path  = require('path');
const { Book, BookInfo } = require('../models/models');
const ApiError = require('../error/ApiError');
const fs = require('fs');

class BookController {
  async create(req, res, next) {
    try {
      const { name, price, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      const book = await Book.create({ name, price, typeId, img: fileName });

      if (info) {
        const parsedInfo = JSON.parse(info);
        await Promise.all(parsedInfo.map(i => 
          BookInfo.create({
            title: i.title,
            description: i.description,
            bookId: book.id
          })
        ));
      }

      return res.json(book);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { typeId, limit, page }  = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let books;

    if (!typeId) {
      books = await Book.findAndCountAll({ limit, offset });
    } else {
      books = await Book.findAndCountAll({ where: { typeId }, limit, offset });
    }

    return res.json(books);
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      console.log("Fetching book with id:", id);

      const book = await Book.findOne({
        where: { id },
        include: [{ model: BookInfo, as: 'info' }]
      });

      if (!book) {
        console.log("No book found with id:", id);
        return res.status(404).json({ error: "Book not found" });
      }

      console.log("Book found:", book);
      return res.json(book);
    } catch (e) {
      console.error("Error fetching book:", e);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const book = await Book.findOne({ where: { id } });

      if (!book) {
        return next(ApiError.notFound(`Книга с айди ${id} не найдена`));
      }

      await BookInfo.destroy({ where: { bookId: id } });

      const imagePath = path.resolve(__dirname, '..', 'static', book.img);
      fs.unlinkSync(imagePath);

      await Book.destroy({ where: { id } });

      return res.json({ message: 'Книга успешно удалена' });
    } catch (e) {
      console.error('Ошибка при удалении книги:', e);
      return next(ApiError.internal('Произошла ошибка при удалении книги'));
    }
  }
  async getTopNewBooks(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 4; 
      const newBooks = await Book.findAll({
        order: [['createdAt', 'DESC']],
        limit
      });
      
      return res.json(newBooks);
    } catch (e) {
      console.error('Error fetching top new books:', e);
      return next(ApiError.internal('Произошла ошибка при получении последних добавленных книг'));
    }
  }
}
module.exports = new BookController();
