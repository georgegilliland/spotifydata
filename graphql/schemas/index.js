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

    type Deleted {
        deleted: Boolean!
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
    
    input DeleteArtistInput {
        id: String!
    }

    type Query {
        artists: [Artist!]!
    }

    type Mutation {
        createArtist(input: ArtistInput): Artist
        deleteAllArtists: Deleted
        deleteArtist(input: DeleteArtistInput): Deleted
    }

    schema {
        query: Query
        mutation: Mutation
    }
`)
