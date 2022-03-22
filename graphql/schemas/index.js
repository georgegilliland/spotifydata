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
        popularity: Int!
        image: Image!
    }

    type Deleted {
        deleted: Boolean!
    }

    type TokenSuccess {
        success: Boolean!
    }

    type RefreshTokenSuccess {
        refreshToken: String!
    }

    type UpsertArtistsSuccess {
        success: Boolean!
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
        popularity: Int!
        image: ImageInput!
    }   
    
    input DeleteArtistInput {
        id: String!
    }

    input UpdateArtistInput {
        id: String!
        name: String
        link: String
        genres: [String]
        popularity: Int
        image: ImageInput
    } 

    input UpsertArtistsInput {
        artists: [ArtistInput]!
    }

    input CreateSpotifyAccessTokenInput {
        token: String!
        name: String
    }

    input QueryArtistsInput {
        popularity: Int
        updatedAt: String
    }

    type Query {
        artists(input: QueryArtistsInput): [Artist!]!
        getRefreshToken: RefreshTokenSuccess
    }

    type Mutation {
        upsertArtist(input: ArtistInput): Artist
        upsertArtists(input: UpsertArtistsInput): UpsertArtistsSuccess
        deleteAllArtists: Deleted
        deleteArtist(input: DeleteArtistInput): Deleted
        updateArtist(input: UpdateArtistInput): Artist
        createSpotifyAccessToken(input: CreateSpotifyAccessTokenInput): TokenSuccess
    }

    schema {
        query: Query
        mutation: Mutation
    }
`)
