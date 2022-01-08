const Artist = require("../../models/artist")

module.exports = {
  artists: async () => {
    try {
      const artistsFetched = await Artist.find()
      return artistsFetched.map(artist => {
        return {
          ...artist._doc,
          _id: artist.id,
        }
      })
    } catch (error) {
      throw error
    }
  },

  upsertArtist: async args => {
    try {
      const { id, name, link, genres, image } = args.input;
      const query = { 'id': id };
      const artist = {
        id,
        name,
        link,
        genres,
        image
      };

      const result = await Artist.findOneAndUpdate(query, artist, { upsert: true, new: true });
      return result;

    } catch (error) {
      throw error;
    }
  },

  updateArtist: async args => {
    try {
      const input = args.input;
      const query = { 'id': input.id };

      const result = await Artist.findOneAndUpdate(query, input, { new: true });

      if (!result) throw new Error('Cannot update artist, it does not exist in db')

      return result

    } catch (error) {
      throw error;
    }
  },

  deleteAllArtists: async args => {
    try {
      await Artist.deleteMany({});
      return { deleted: true }
    } catch (error) {
      throw error
    }
  },

  deleteArtist: async args => {
    try {
      const { id } = args.input
      await Artist.deleteOne({id});
      return { deleted: true }
    } catch (error) {
      throw error
    }
  }
}