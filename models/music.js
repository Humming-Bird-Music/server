const mongoose = require('mongoose');
const Schema = mongoose.Schema

const musicSchema = new Schema({
  "title": {
    "type": "String",
    default: "Unknown Music Title"
  },
  "artist": {
    "type": "String",
    default: "Unknown Music Artist"
  },
  "album": {
    "type": "String",
    default: "Unknown Music Album"
  },
  url: String,
  owner: {type: Schema.Types.ObjectId, ref: "Users"}
}, { timestamps: true })

const Music = mongoose.model('Musics', musicSchema)

module.exports = Music