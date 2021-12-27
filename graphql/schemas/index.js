const { buildSchema } = require("graphql")

module.exports = buildSchema(`

    type Image {
        height: Int!
        width: Int!
        link: String!
    }

    type Artist {
        _id: ID!
        id: String!
        name: String!
        link: String!
        genres: [String]!
        image: Image!
    }

    input ImageInput {
        height: Int!
        width: Int!
        link: String!
    }

    input ArtistInput {
        id: String!
        name: String!
        link: String!
        genres: [String]!
        image: ImageInput!
    }    

    type Query {
        artists: [Artist!]!
    }

    type Mutation {
        createArtist(input: ArtistInput): Artist
    }

    schema {
        query: Query
        mutation: Mutation
    }
`)
