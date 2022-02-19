const Artist = require("../../../db/models/artist");
const NODE_ENV = require('../../../config');

const artistMutations = {
  upsertArtists: async (args, req) => {
    if (req.headers.authorization !== (NODE_ENV.AUTHKEYJABRONI))
    throw new Error("Authentication error");
    try {
      
      const { artists } = args.input;
      const mappedArtists = artists.map(a => {
        const { id, name, link, genres, image, popularity } = a;
        return {
          id, name, link, genres, image, popularity
        }
      });

      await Artist.bulkWrite(mappedArtists.map(doc => ({
        updateOne: {
          filter: { id: doc.id },
          update: doc,
          upsert: true
        }
      })));

      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  upsertArtist: async (args, req) => {
    if (req.headers.authorization !== (NODE_ENV.AUTHKEYJABRONI))
      throw new Error("Authentication error");
    try {
      const { id, name, link, genres, image, popularity } = args.input;
      const query = { id: id };
      const artist = {
        id,
        name,
        link,
        genres,
        image,
        popularity
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
    if (req.headers.authorization !== (NODE_ENV.AUTHKEYJABRONI))
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
    if (req.headers.authorization !== (NODE_ENV.AUTHKEYJABRONI))
      throw new Error("Authentication error");
    try {
      await Artist.deleteMany({});
      return { deleted: true };
    } catch (error) {
      throw error;
    }
  },

  deleteArtist: async (args, req) => {
    if (req.headers.authorization !== (NODE_ENV.AUTHKEYJABRONI))
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
