var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var bookModel = new Schema(
  {
    title: { type: String, required: true },
    author: String,
    edition: { type: Number, default: 1 },
    publishAt: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookModel);
