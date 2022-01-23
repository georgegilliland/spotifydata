const mongoose = require("mongoose")

const Schema = mongoose.Schema

const authenticationSchema = new Schema({
    access_token: {
        type: String,
        required: true,
    },
    token_type: {
        type: String,
        required: true,
    },
    refresh_token: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Authentications", authenticationSchema)
