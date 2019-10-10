const mongoose = require('mongoose');
const Schema = mongoose.Schema

const musicSchema = new Schema({
  "title": {
    "type": "String"
  },
  "artist": {
    "type": "String"
  },
  "album": {
    "type": "String"
  },
  url: String
}, { timestamps: true })

const Music = mongoose.model('Musics', musicSchema)

module.exports = Music