const { formUrlEncoded } = require("../utils/utils");
const axios = require("axios");
const moment = require("moment");

const Artist = require("../../models/artist");
const Authentication = require("../../models/authentication");

module.exports = {
  artists: async (args, req) => {
    if (req.headers.authorization !== process.env.KEY) throw new Error("Authentication error");
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

  upsertArtist: async (args, req) => {
    if (req.headers.authorization !== process.env.KEY) throw new Error("Authentication error");
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
    if (req.headers.authorization !== process.env.KEY) throw new Error("Authentication error");
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
    if (req.headers.authorization !== process.env.KEY) throw new Error("Authentication error");
    try {
      await Artist.deleteMany({});
      return { deleted: true };
    } catch (error) {
      throw error;
    }
  },

  deleteArtist: async (args, req) => {
    if (req.headers.authorization !== process.env.KEY) throw new Error("Authentication error");
    try {
      const { id } = args.input;
      await Artist.deleteOne({ id });
      return { deleted: true };
    } catch (error) {
      throw error;
    }
  },

  createSpotifyAccessToken: async (args, req) => {
    if (req.headers.authorization !== process.env.KEY) throw new Error("Authentication error");
    const { token } = args.input;

    if (!token) {
      return { success: false };
    }

    const encoded = Buffer.from(
      process.env.CLIENTKEYANDSECRET
    ).toString("base64");
    const formEncodedData = formUrlEncoded({
      code: token,
      redirect_uri: "http://localhost:3000/",
      grant_type: "authorization_code",
    });
    const headers = {
      headers: {
        Authorization: "Basic " + encoded,
        "Content-Type": "application/x-www-form-urlencoded ",
      },
    };

    try {
      const { data } = await axios.post(
        "https://accounts.spotify.com/api/token",
        formEncodedData,
        headers
      );

      if (data.error) throw new Error({ success: false });

      await Authentication.create({
        access_token: data.access_token,
        token_type: data.token_type,
        refresh_token: data.refresh_token,
        name: `Spotify - ${moment().format()}`,
      });
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  },

  getRefreshToken: async (args, req) => {
    if (req.headers.authorization !== process.env.KEY) throw new Error("Authentication error");
    const authenticationsFetched = await Authentication.find();
    const refreshToken = authenticationsFetched[0].refresh_token;
    const encoded = Buffer.from(
      process.env.CLIENTKEYANDSECRET
    ).toString("base64");
    const formEncodedData = formUrlEncoded({
      'refresh_token': refreshToken,
      grant_type: "refresh_token",
    });
    const headers = {
      headers: {
        Authorization: "Basic " + encoded,
        "Content-Type": "application/x-www-form-urlencoded ",
      },
    };

    try {
      const { data } = await axios.post(
        "https://accounts.spotify.com/api/token",
        formEncodedData,
        headers
      );
      return { refreshToken: data.access_token };
    } catch (e) {
      return { refreshToken: e.message };
    }
  }
};
