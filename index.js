const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graphql/schemas");
const graphqlResolvers = require("./graphql/resolvers");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

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

const uri = `mongodb+srv://georgegilliland:LU7227bb@george-cluster.jjfzz.mongodb.net/Spotify?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
    .connect(uri, options)
    .then(() => app.listen({ port: process.env.PORT || 4000 }, console.log("Server is running")))
    .catch(error => {
        throw error
    });
