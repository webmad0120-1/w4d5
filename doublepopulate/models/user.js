const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaName = new Schema({
  username: String
});

const Model = mongoose.model('User', schemaName);
module.exports = Model;