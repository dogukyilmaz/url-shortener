const mongoose = require('mongoose');
const shortID = require('shortid');

const shortUrlSchema = new mongoose.Schema({
  fullURL: { type: String, required: true },
  shortURL: { type: String, required: true, unique: true, default: shortID.generate },
  clicks: { type: Number, required: true, default: 0}
});

module.exports = mongoose.model('ShortURL', shortUrlSchema);