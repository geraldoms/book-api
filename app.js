var express = require("express"),
  bookRouter = require("./routes/bookRouter")(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  config = require("./config/index");

var app = express();

mongoose.connect(
  config.db,
  { useNewUrlParser: true }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/books", bookRouter);

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + " - Not Found" });
});

app.listen(config.port, function() {
  console.log("Running on PORT:" + config.port);
});

module.exports = app;
