const { UserInputError } = require('apollo-server');
const books = require('../data/books');
const authors = require('../data/authors');

const logRequest = (point) => console.log(`Request: ${point}`);

const Query = {

  books: (_, { genre, minPrice, maxPrice }) => {
    logRequest(`books`);
    return books.filter((book) => {
      let matchesGenre = genre ? book.genre === genre : true;
      let matchesPrice =
        (minPrice ? book.price >= minPrice : true) &&
        (maxPrice ? book.price <= maxPrice : true);
      return matchesGenre && matchesPrice;
    });
  },

  book: (_, { id }) => {
    logRequest(`book`);
    const book = books.find((book) => book.id === id);
    if (!book) {
      throw new UserInputError(`Book with ID "${id}" not found.`);
    }
    return book;
  },

  authors: () => {
    logRequest(`authors`);
    return authors;
  },

  author: (_, { id }) => {
    logRequest(`author`);
    const author = authors.find((author) => author.id === id);
    if (!author) {
      throw new UserInputError(`Author with ID "${id}" not found.`);
    }
    return author;
  },

  search: (_, { keyword }) => {
    const bookResults = books.filter((book) =>
      book.title.toLowerCase().includes(keyword.toLowerCase())
    );
    const authorResults = authors.filter((author) =>
      author.name.toLowerCase().includes(keyword.toLowerCase())
    );
    return [...bookResults, ...authorResults];
  },
};

module.exports = Query;
