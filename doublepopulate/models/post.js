const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaName = new Schema({
  title: String,
  author: {type: Schema.Types.ObjectId, ref: "User"},
  comments: {type: Schema.Types.ObjectId, ref: "Comment"},
});

const Model = mongoose.model('Post', schemaName);
module.exports = Model;