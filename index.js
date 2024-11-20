const { ApolloServer, gql, UserInputError } = require('apollo-server');

// Define schema
const typeDefs = gql`
  type Query {
    books: [Book]
    book(id: ID!): Book
    authors: [Author]
    author(id: ID!): Author
  }

  type Mutation {
    addBook(title: String!, authorId: ID!, genre: String!, price: Float!): Book
    addAuthor(name: String!, bio: String): Author
  }

  type Book {
    id: ID
    title: String
    genre: String
    price: Float
    author: Author
  }

  type Author {
    id: ID
    name: String
    bio: String
    books: [Book]
  }
`;

// Mock data
const authors = [
  { id: "1", name: "J.K. Rowling", bio: "Author of Harry Potter" },
  { id: "2", name: "George R.R. Martin", bio: "Author of A Song of Ice and Fire" },
];

const books = [
  { id: "1", title: "Harry Potter", genre: "Fantasy", price: 29.99, authorId: "1" },
  { id: "2", title: "Game of Thrones", genre: "Fantasy", price: 39.99, authorId: "2" },
];

// Resolvers with Error Handling
const resolvers = {
  Query: {
    books: () => books,
    book: (_, { id }) => {
      const book = books.find((book) => book.id === id);
      if (!book) {
        throw new UserInputError(`Book with ID "${id}" not found.`);
      }
      return book;
    },
    authors: () => authors,
    author: (_, { id }) => {
      const author = authors.find((author) => author.id === id);
      if (!author) {
        throw new UserInputError(`Author with ID "${id}" not found.`);
      }
      return author;
    },
  },
  Mutation: {
    addBook: (_, { title, authorId, genre, price }) => {
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
  },
  Book: {
    author: (book) => authors.find((author) => author.id === book.authorId),
  },
  Author: {
    books: (author) => books.filter((book) => book.authorId === author.id),
  },
};

// Create server
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  introspection: true,
  formatError: (err) => {
    // Log errors for debugging (optional)
    console.error(err);
    return {
      message: err.message,
      locations: err.locations,
      path: err.path,
    };
  }
});

// Start server
server.listen().then(({ url }) => {
  console.log(`Mock GraphQL server running at ${url}`);
});
