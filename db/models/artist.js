const mongoose = require("mongoose")

const Schema = mongoose.Schema

const artistSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    genres: {
        type: [String],
        required: true,
    },
    popularity: {
        type: Number,
        required: true
    },
    image: {
        height: Number,
        width: Number,
        link: String,
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Artist", artistSchema)
