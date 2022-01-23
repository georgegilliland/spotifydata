const Artist = require("../../../db/models/artist");

const artistQueries = {
  artists: async (args, req) => {
    if (req.headers.authorization !== process.env.KEY)
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
