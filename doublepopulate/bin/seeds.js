const mongoose = require("mongoose");
const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");
const util = require("util");

mongoose
  .connect("mongodb://localhost/doublepopulate", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    User.deleteMany()
      .then(x => {
        return Comment.deleteMany();
      })
      .then(x => {
        return Post.deleteMany();
      })
      .then(x => {
        let userId;

        User.create([{ username: "fran" }, { username: "quique" }])
          .then(createdUsers => {
            userId = createdUsers[0]._id;
            return Comment.create([{ text: "t1", author: userId }]);
          })
          .then(createdComment => {
            return Post.create([
              { title: "post title 1", author: userId, comments: createdComment[0]._id }
            ]);
          })
          .then(createdPost => {
            Post.find()
              .populate("author")
              .populate({
                path: "comments",
                populate: {
                  path: "author",
                  model: "User"
                }
              })
              .then(populatedPost => {
                console.log(util.inspect(populatedPost, false, null, true /* enable colors */));

                process.exit(0);
              });
          });
      });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
