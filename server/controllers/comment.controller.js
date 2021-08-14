const {Comment} = require('../models/comment.model')
const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require("dotenv").config();

module.exports.createcomment = (request, response) => {
  const { text } = request.body;
  const uid = request.params.uid;
  const user = User.findOne({_id:uid})
  const post = Post.findOne({_id:pid})
    Comment.create({text})
    .then(Comment => Comment.findOneAndUpdate({_id:post._id}, {$push:{user:user}}))
    .then(Comment => Comment.findOneAndUpdate({_id:post._id}, {$push:{post:post}}))
    .then(Comment => User.findOneAndUpdate({_id:uid}, {$push:{comments:comment}}))
    .catch(err => response.json(err));
}

module.exports.createNewComment = async (request, response) => {
      const { text } = request.body;
      try{
          let newComment =await Comment.create({text})
          let user= await User.findOneAndUpdate({_id:request.params.uid},{$push:{comments:newComment}},{ new: true,useFindAndModify: false})
          let post=await Post.findOneAndUpdate({_id:request.params.pid},{$push:{comments:newComment}},{ new: true,useFindAndModify: false})
          let updatedComment = await Comment.findOneAndUpdate({_id:newComment._id},{$push:{post:post,user:user}},{ new: true,useFindAndModify: false})
          return response.json(updatedComment)
      }
      catch{err => response.status(400).json(err)}
}

module.exports.findAllcomments = (request,response) => {
  Comment.find({}).populate('user')
  .then(res => response.json(res))
  .catch(err => response.json(err))
}

module.exports.findOneComment = (request,response) => {
  Comment.findOne({}).populate('user')
  .then(res => response.json(res))
  .catch(err => response.json(err))
}

module.exports.deletecomment = (request, response) => {
  const comment = Comment.findOne({_id:request.params.pid})
    Comment.deleteOne({ _id: request.params.id })
        .then(deletePost => response.json(deletePost))
        .then(res => User.findOneAndUpdate({_id:request.params.uid}, {$pull:{posts:post}} ))
        .then(res => Post.findOneAndUpdate({_id:request.params.pid}, {$pull:{comments:comment}} ))
        .catch(err => response.json(err))
}
