var bookController = function(Book) {
  
  var post = (req, res) => {
    var book = new Book(req.body);
    book.save((err, book) => {
      if (err) throw err;
      res.status(201).send("Book created successfully");
    });
  };

  var get = (req, res) => {
    var query = {};
    if (req.query.title) {
      query.title = req.query.title;
    }
    Book.find(query, (err, books) => {
      if (err) throw err;
      res.json(books);
    });
  };

  var getOne = (req, res) => {
    res.json(req.book);
  };

  var put = (req, res) => {
    var book = req.book;
    book.title = req.body.title;
    book.author = req.body.author;
    book.edition = req.body.edition;
    book.publishAt = req.body.publishAt;

    book.save((err, newBook) => {
      res.json(newBook);
    });
  };

  var patch = (req, res) => {
    if (req.body._id) delete req.body._id;
    for (var field in req.body) {
      req.book[field] = req.body[field];
    }
    req.book.save((err, book) => {
      res.json(book);
    });
  };

  var del = (req, res) => {
    req.book.remove(err => {
      if (err) throw err;
      res.status(204).send("Book removed successfully");
    });
  };

  return {
    post: post,
    get: get,
    getOne: getOne,
    put: put,
    patch: patch,
    del: del
  };
};

module.exports = bookController;
