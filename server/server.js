const express = require('express');
require("dotenv").config();
const cors = require('cors');
const bodyParser = require('body-parser'); 
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const url= process.env.ATLAS_URL;

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use('*', cors());
app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log("MongoDB database connection established.")
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};
  
// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
  
//Test Commit