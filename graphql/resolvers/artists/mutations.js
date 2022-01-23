const Artist = require("../../../db/models/artist");

const artistMutations = {
  upsertArtist: async (args, req) => {
    if (req.headers.authorization !== process.env.KEY)
      throw new Error("Authentication error");
    try {
      const { id, name, link, genres, image } = args.input;
      const query = { id: id };
      const artist = {
        id,
        name,
        link,
        genres,
        image,
      };

      const result = await Artist.findOneAndUpdate(query, artist, {
        upsert: true,
        new: true,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },

  updateArtist: async (args, req) => {
    if (req.headers.authorization !== process.env.KEY)
      throw new Error("Authentication error");
    try {
      const input = args.input;
      const query = { id: input.id };

      const result = await Artist.findOneAndUpdate(query, input, { new: true });

      if (!result)
        throw new Error("Cannot update artist, it does not exist in db");

      return result;
    } catch (error) {
      throw error;
    }
  },

  deleteAllArtists: async (args, req) => {
    if (req.headers.authorization !== process.env.KEY)
      throw new Error("Authentication error");
    try {
      await Artist.deleteMany({});
      return { deleted: true };
    } catch (error) {
      throw error;
    }
  },

  deleteArtist: async (args, req) => {
    if (req.headers.authorization !== process.env.KEY)
      throw new Error("Authentication error");
    try {
      const { id } = args.input;
      await Artist.deleteOne({ id });
      return { deleted: true };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = artistMutations;
