const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  introspection: true,
  formatError: (err) => {
    console.error(err);
    return {
      message: err.message,
      locations: err.locations,
      path: err.path,
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`Mock GraphQL server running at ${url}`);
});