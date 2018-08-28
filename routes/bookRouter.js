var express = require("express");
var Book = require("../models/bookModel");

module.exports = function() {
  var bookRouter = express.Router();
  var bookController = require("../controllers/bookController")(Book);
  bookRouter
    .route("/")
    .get(bookController.get)
    .post(bookController.post);

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
    .get(bookController.getOne)
    .put(bookController.put)
    .patch(bookController.patch)
    .delete(bookController.del);

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
