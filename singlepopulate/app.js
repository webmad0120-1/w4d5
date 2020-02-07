const mongoose = require("mongoose");
const Users = require("./models/User");
const Cars = require("./models/Car");

function checkUser() {
  Cars.findOne()
    // .populate("owner")
    .sort({ createdAt: -1 })
    .then((carData) => {
      console.log(carData);

      process.exit(0);
    });
}

function createCarAndUser(cb) {
  Users.create({
    name: "John",
    password: "abc"
  })
    .then((createdUser) => {
      return Cars.create({
        plaque: "a",
        make: "audi",
        owner: createdUser._id
      });
    })
    .then(() => cb());
}

mongoose
  .connect("mongodb://localhost/singlePopulate", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);

    createCarAndUser(checkUser);
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });
