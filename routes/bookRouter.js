var express = require("express");
var Book = require("../models/bookModel");

module.exports = function() {
  var bookRouter = express.Router();
  bookRouter
    .route("/")
    .get((req, res) => {
      var query = {};
      if (req.query.title) {
        query.title = req.query.title;
      }
      Book.find(query, (err, books) => {
        if (err) throw err;
        res.json(books);
      });
    })
    .post((req, res) => {
      var book = new Book(req.body);
      book.save((err, book) => {
        if (err) throw err;
        res.status(201).send("Book created successfully");
      });
    });

  bookRouter.use("/:id", (req, res, next) => {
    Book.findById(req.params.id, (err, book) => {
      if (err) throw err;
      if (book) {
        req.book = book;
        next();
      } else {
        res.status(404).send("No book found for Id: " + req.params.id);
      }
    });
  });

  bookRouter
    .route("/:id")
    .get((req, res) => {
      res.json(req.book);
    })
    .put((req, res) => {
      var book = req.book;
      book.title = req.body.title;
      book.author = req.body.author;
      book.edition = req.body.edition;
      book.publishAt = req.body.publishAt;

      book.save((err, newBook) => {
        res.json(newBook);
      });
    })
    .patch((req, res) => {
      if (req.body._id) delete req.body._id;
      for (var field in req.body) {
        req.book[field] = req.body[field];
      }
      req.book.save((err, book) => {
        res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove(err => {
        if (err) throw err;
        res.status(204).send("Book removed successfully");
      });
    });

  bookRouter.get("/setup", (req, res) => {
    var books = [
      {
        title: "Clean Code",
        author: "Robert Martin",
        edition: 1,
        publishAt: new Date(2008, 07, 17)
      },
      {
        title: "The Phoenix Project",
        author: "Gene kin",
        edition: 1,
        publishAt: new Date(2013, 01, 10)
      }
    ];
    Book.create(books, (err, books) => {
      if (err) throw err;
      res.json(books);
    });
  });

  return bookRouter;
};
