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
  { id: "3", name: "J.R.R. Tolkien", bio: "Author of The Lord of the Rings" },
  { id: "4", name: "Agatha Christie", bio: "Famous mystery novelist" },
  { id: "5", name: "Isaac Asimov", bio: "Pioneer of science fiction" },
  { id: "6", name: "Jane Austen", bio: "Author of Pride and Prejudice" },
  { id: "7", name: "Dan Brown", bio: "Author of The Da Vinci Code" },
  { id: "8", name: "Haruki Murakami", bio: "Renowned Japanese novelist" },
];

const books = [
  { id: "1", title: "Harry Potter", genre: "Fantasy", price: 29.99, authorId: "1" },
  { id: "2", title: "Game of Thrones", genre: "Fantasy", price: 39.99, authorId: "2" },
  { id: "3", title: "The Lord of the Rings", genre: "Fantasy", price: 49.99, authorId: "3" },
  { id: "4", title: "Murder on the Orient Express", genre: "Mystery", price: 19.99, authorId: "4" },
  { id: "5", title: "Foundation", genre: "Science Fiction", price: 24.99, authorId: "5" },
  { id: "6", title: "Pride and Prejudice", genre: "Romance", price: 14.99, authorId: "6" },
  { id: "7", title: "Angels and Demons", genre: "Thriller", price: 19.99, authorId: "7" },
  { id: "8", title: "Norwegian Wood", genre: "Literary Fiction", price: 18.99, authorId: "8" },
  { id: "9", title: "The Hobbit", genre: "Fantasy", price: 29.99, authorId: "3" },
  { id: "10", title: "The Da Vinci Code", genre: "Thriller", price: 22.99, authorId: "7" },
  { id: "11", title: "A Clash of Kings", genre: "Fantasy", price: 34.99, authorId: "2" },
  { id: "12", title: "The Casual Vacancy", genre: "Drama", price: 24.99, authorId: "1" },
  { id: "13", title: "Emma", genre: "Romance", price: 12.99, authorId: "6" },
  { id: "14", title: "The Silmarillion", genre: "Fantasy", price: 35.99, authorId: "3" },
  { id: "15", title: "The Mysterious Affair at Styles", genre: "Mystery", price: 15.99, authorId: "4" },
];

// Resolvers with Error Handling
const resolvers = {
  Query: {
    books: () => {
      logRequest(`books`)
      return books
    },
    book: (_, { id }) => {
      logRequest(`book`)
      const book = books.find((book) => book.id === id);
      if (!book) {
        throw new UserInputError(`Book with ID "${id}" not found.`);
      }
      return book;
    },
    authors: () => {
      logRequest(`authors`)
      return authors
    },
    author: (_, { id }) => {
      logRequest(`author`)
      const author = authors.find((author) => author.id === id);
      if (!author) {
        throw new UserInputError(`Author with ID "${id}" not found.`);
      }
      return author;
    },
  },
  Mutation: {
    addBook: (_, { title, authorId, genre, price }) => {
      logUpdate(`addBook`)
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
      logUpdate(`addAuthor`)
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

function logRequest(point){
  console.log(`Request: ${point}`)
}

function logUpdate(point){
  console.log(`Update: ${point}`)
}

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
