
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./src/config/db');
const schema = require('./src/graphql/schemas/index');

require('dotenv').config();

async function startServer() {
  const app = express();
  connectDB();

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const role = req.headers['role'] || 'USER'; 
      return { role };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
