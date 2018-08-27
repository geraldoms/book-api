var express = require("express");
var open = require("open");

var app = express();
var port = process.env.PORT || 3000;

app.get("/", function(req, res) {
  res.send("Hello!");
});

app.listen(port, function() {
  console.log("Running on PORT:" + port);
  open("http://localhost:" + port);
});
