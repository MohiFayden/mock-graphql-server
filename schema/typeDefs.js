const { gql } = require('apollo-server');

const typeDefs = gql`
  
  union SearchResult = Book | Author

  type Query {
    books(genre: String, minPrice: Float, maxPrice: Float): [Book]
    book(id: ID!): Book
    authors: [Author]
    author(id: ID!): Author
    search(keyword: String!): [SearchResult]
  }

  type Mutation {
    addBook(title: String!, authorId: ID!, genre: String!, price: Float!): Book
    addAuthor(name: String!, bio: String): Author
    updateBook(id: ID!, title: String, genre: String, price: Float): Book
    deleteBook(id: ID!): String
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

module.exports = typeDefs;
