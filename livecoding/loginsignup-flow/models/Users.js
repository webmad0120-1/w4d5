const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaName = new Schema(
  {
    username: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["editor", "admin", "guest"] }
  },
  { timestamps: true }
);

const Model = mongoose.model("Users", schemaName);
module.exports = Model;
