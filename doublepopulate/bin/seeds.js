const mongoose = require('mongoose');
const Comment = require("../models/comment")
const Post = require("../models/post")
const User = require("../models/user")

mongoose
  .connect('mongodb://localhost/doublepopulate', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

User.remove().then(x => {
  return Comment.remove()
}).then(x => {
  return Post.remove()
})
  .then(x => {


    let userId;

    User
      .create([{ username: "sito" }, { username: "luca" }])
      .then(createdUsers => {
        userId = createdUsers[0]._id
        return Comment
          .create([{ text: 't1', author: userId }])
      })
      .then(createdComment => {
        return Post
          .create([{ title: 'post title 1', author: userId, comments: createdComment[0]._id }])
      })
      .then(createdPost => {
        Post
          .find()
          .populate("author")
          .populate({
            path: 'comments',
            populate: {
              path: 'author',
              model: 'User'
            }
          })
          .then(popPost => {
            console.log(JSON.stringify(popPost))
            process.exit(0);
          })
      })
  })