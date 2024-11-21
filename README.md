# Mock GraphQL Server

This project is a simple **mock GraphQL server** built with **Node.js** and **Apollo Server**. It allows you to experiment with GraphQL queries, mutations, and advanced concepts like fragments, inline fragments, and unions. The server includes a mock dataset of books and authors, making it easy to test GraphQL functionalities.

## Getting Started

### Prerequisites

- **Node.js**: Make sure you have Node.js installed on your computer. You can download it from [Node.js Official Site](https://nodejs.org/).

### Installation

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:MohiFayden/mock-graphql-server.git
   cd mock-graphql-server
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

### Running the Server

To start the server, run:
```bash
node index.js
```
By default, the server will run on `http://localhost:4000`.

### Accessing the GraphQL Playground
Once the server is running, you can open the GraphQL Playground by navigating to:
```
http://localhost:4000
```

## Available Queries and Mutations

### Queries
- **Get All Books**:
  ```graphql
  query {
    books {
      id
      title
      genre
      price
      author {
        name
      }
    }
  }
  ```
- **Get All Authors**:
  ```graphql
  query {
    authors {
      id
      name
      bio
      books {
        title
      }
    }
  }
  ```
- **Search Books and Authors**:
  ```graphql
  query {
    search(keyword: "Fantasy") {
      ...on Book {
        title
        price
      }
      ...on Author {
        name
        bio
      }
    }
  }
  ```

### Mutations
- **Add a Book**:
  ```graphql
  mutation {
    addBook(title: "The Hobbit", authorId: "3", genre: "Fantasy", price: 19.99) {
      id
      title
    }
  }
  ```
- **Update a Book**:
  ```graphql
  mutation {
    updateBook(id: "1", title: "Updated Title", price: 29.99) {
      id
      title
      price
    }
  }
  ```
- **Delete a Book**:
  ```graphql
  mutation {
    deleteBook(id: "2")
  }
  ```

## Modifying the Schema
The schema is defined in `typeDefs.js` and can be easily modified to include additional types, fields, or mutations.

## Troubleshooting
- **Port Already in Use**: If you encounter an error about the port being in use, make sure no other server is running on port 4000 or modify the port in `index.js`.

- **GraphQL Playground Not Loading**: Ensure the server is running without errors and that you’re accessing the correct URL (`http://localhost:4000`).

## License
This project is open-source and available under the **MIT License**.


## Author
- **Mohi Fayden** - [GitHub Profile](https://github.com/MohiFayden)

