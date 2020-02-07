const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaName = new Schema({
  text: String,
  author: { type: Schema.Types.ObjectId, ref: "User" }
});

const Model = mongoose.model('Comment', schemaName);
module.exports = Model;