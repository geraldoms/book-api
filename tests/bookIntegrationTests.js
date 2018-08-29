var supertest = require("supertest"),
  app = require("../app"),
  mongoose = require("mongoose"),
  Book = mongoose.model("Book"),
  agent = supertest.agent(app),
  chai = require("chai"),
  expect = chai.expect;

describe("Book API Integration Test", function() {

  describe("### GET /books", function() {
    it("Should get all books", function(done) {
      agent.get("/api/books").end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body).to.be.empty;
        done();
      });
    });
  });

  describe("### GET /books/:id", function() {
    it("Should get one book", function(done) {
      let book = new Book({
        title: "new Book II",
        author: "Richard Michael",
        edition: 2,
        publishAt: new Date()
      });

      book.save((err, book) => {
        agent.get("/api/books/" + book.id).end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an("object");
          expect(res.body.title).to.equal("new Book II");
          expect(res.body.author).to.equal("Richard Michael");
          expect(res.body._id).to.exist;
          done();
        });
      });
    });
  });

  describe("### POST /books", function() {
    it("Should post a book and return _id property", function(done) {
      agent
        .post("/api/books")
        .send({
          title: "new Book",
          author: "Gene Kin",
          edition: 1,
          publishAt: new Date()
        })
        .end(function(err, res) {
          expect(res.statusCode).to.equal(201);
          expect(res.body.title).to.equal("new Book");
          expect(res.body._id).to.exist;
          done();
        });
    });
  });
  // TODO: create tests for the rest of the endpoints

  afterEach(function(done) {
    Book.remove().exec();
    done();
  });
});
