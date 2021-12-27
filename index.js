const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const graphqlSchema = require("./graphql/schemas")
const graphqlResolvers = require("./graphql/resolvers")
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

app.use("/api", graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
}));

const uri = `mongodb+srv://georgegilliland:LU7227bb@george-cluster.jjfzz.mongodb.net/Spotify?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
    .connect(uri, options)
    .then(() => app.listen(4000, console.log("Server is running")))
    .catch(error => {
        throw error
    });
