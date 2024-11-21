const { UserInputError } = require('apollo-server');
const books = require('../data/books');
const authors = require('../data/authors');

const logUpdate = (point) => console.log(`Update: ${point}`);

const Mutation = {

  addBook: (_, { title, authorId, genre, price }) => {
    logUpdate(`addBook`);
    if (!authors.some((author) => author.id === authorId)) {
      throw new UserInputError(`Author with ID "${authorId}" does not exist.`);
    }
    const newBook = {
      id: `${books.length + 1}`,
      title,
      genre,
      price,
      authorId,
    };
    books.push(newBook);
    return newBook;
  },

  addAuthor: (_, { name, bio }) => {
    if (name.trim() === "") {
      throw new UserInputError("Author name cannot be empty.");
    }
    const newAuthor = {
      id: `${authors.length + 1}`,
      name,
      bio,
    };
    authors.push(newAuthor);
    return newAuthor;
  },

  updateBook: (_, { id, title, genre, price }) => {
    const book = books.find((book) => book.id === id);
    if (!book) {
      throw new UserInputError(`Book with ID "${id}" not found.`);
    }
    if (title) book.title = title;
    if (genre) book.genre = genre;
    if (price) book.price = price;
    logUpdate(`addBook -> "${id}" has been updated`);
    return book;
  },

  deleteBook: (_, { id }) => {
    const index = books.findIndex((book) => book.id === id);
    if (index === -1) {
      throw new UserInputError(`Book with ID "${id}" not found.`);
    }
    books.splice(index, 1); // Remove the book from the array
    logUpdate(`deleteBook -> "${id}" has been deleted`);
    return `Book with ID "${id}" was successfully deleted.`;
  },
};

module.exports = Mutation;
