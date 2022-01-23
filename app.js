const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graphql/schemas");
const graphqlResolvers = require("./graphql/resolvers");
const cors = require("cors");

const app = express();
app.use(cors());

const expressPlayground = require('graphql-playground-middleware-express')
  .default;

app.get('/playground', expressPlayground({ endpoint: '/api' }))
app.use("/api", graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
    headers: true,
}));

module.exports = app;