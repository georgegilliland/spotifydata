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

  createArtist: async args => {
    try {
      const { id, name, link, genres, image } = args.input
      const artist = new Artist({
        id,
        name,
        link,
        genres,
        image
      })
      const newArtist = await artist.save();
      return { ...newArtist._doc, _id: newArtist.id }
    } catch (error) {
      throw error
    }
  },

  deleteAllArtists: async args => {
    try {
      await Artist.deleteMany({});
      return { deleted: true }
    } catch (error) {
      throw error
    }
  }
}