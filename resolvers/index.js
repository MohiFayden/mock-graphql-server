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

  SearchResult: {
    __resolveType(obj) {
      if (obj.price) {
        return "Book";
      }
      if (obj.bio) {
        return "Author";
      }
      return null; // Fallback if no type matches
    },
  },
};

module.exports = resolvers;
