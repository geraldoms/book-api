var express = require("express"),
  bookRouter = require("./routes/bookRouter")(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 3000;

mongoose.connect(
  "<url for the mongodb>",
  { useNewUrlParser: true }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/books", bookRouter);

app.listen(port, function() {
  console.log("Running on PORT:" + port);
});
