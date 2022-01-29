const axios = require("axios");
const { formUrlEncoded } = require("../../utils/utils");
const process = require('dotenv').config();

const Authentication = require("../../../db/models/authentication");

const authenticationQueries = {
  getRefreshToken: async (args, req) => {
    if (
      req.headers.authorization !==
      (process.env.AUTHKEYJABRONI || process.env.KEY)
    )
      throw new Error("Authentication error");
    const authenticationsFetched = await Authentication.find();
    const refreshToken = authenticationsFetched[0].refresh_token;
    const encoded = Buffer.from(
      proccess.env.SPOTIFYCLIENTSECRETANDKEY || process.env.CLIENTKEYANDSECRET
    ).toString("base64");
    const formEncodedData = formUrlEncoded({
      refresh_token: refreshToken,
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
  },
};

module.exports = authenticationQueries;
