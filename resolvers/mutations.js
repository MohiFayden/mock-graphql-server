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
    logUpdate(`addAuthor`);
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
};

module.exports = Mutation;
