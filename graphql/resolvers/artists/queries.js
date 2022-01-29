const Artist = require("../../../db/models/artist");
const NODE_ENV = require('../../../config');

const artistQueries = {
  artists: async (args, req) => {
    if (
      req.headers.authorization !==
      (NODE_ENV.AUTHKEYJABRONI)
    )
      throw new Error("Authentication error");
    try {
      const artistsFetched = await Artist.find();
      return artistsFetched.map((artist) => {
        return {
          ...artist._doc,
          _id: artist.id,
        };
      });
    } catch (error) {
      throw error;
    }
  },
};

module.exports = artistQueries;
