const Query = require('./queries');
const Mutation = require('./mutations');
const books = require('../data/books');
const authors = require('../data/authors');

const resolvers = {
  Query,
  Mutation,
  Book: {
    author: (book) => authors.find((author) => author.id === book.authorId),
  },
  Author: {
    books: (author) => books.filter((book) => book.authorId === author.id),
  },
};

module.exports = resolvers;
