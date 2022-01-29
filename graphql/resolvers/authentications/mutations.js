const axios = require("axios");
const moment = require("moment");
const { formUrlEncoded } = require("../../utils/utils");
const NODE_ENV = require('../../../config');

const Authentication = require("../../../db/models/authentication");

const authenticationMutations = {
  createSpotifyAccessToken: async (args, req) => {
    if (
      req.headers.authorization !==
      (NODE_ENV.AUTHKEYJABRONI)
    )
      throw new Error("Authentication error");
    const { token } = args.input;

    if (!token) {
      return { success: false };
    }

    const encoded = Buffer.from(
      NODE_ENV.SPOTIFYCLIENTSECRETANDKEY
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
};

module.exports = authenticationMutations;
