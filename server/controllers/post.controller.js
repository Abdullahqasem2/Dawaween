const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');

module.exports.createPost = (request, response) => {
  const { text, channel } = request.body;
  const uid = request.params.uid;
  const user = User.findOne({_id:uid})
    Post.create({text, channel})
    .then(post => Post.findOneAndUpdate({_id:post._id}, {$push:{user:user}}))
    .then(post => User.findOneAndUpdate({_id:uid}, {$push:{posts:post}}))
    .catch(err => response.json(err));
}
module.exports.findAllPosts = (request,response) => {
  Post.find({})
  .then(res => response.json(res))
  .catch(err => response.json(err))
}

module.exports.findOnePost = (request,response) => {
  Post.findOne({})
  .then(res => response.json(res))
  .catch(err => response.json(err))
}
module.exports.deletePost = (request, response) => {
  const post = Post.findOne({_id:request.params.pid})
    Post.deleteOne({ _id: request.params.id })
        .then(deletePost => response.json(deletePost))
        .then(res => User.findOneAndUpdate({_id:request.params.uid}, {$pull:{posts:post}}))
        .catch(err => response.json(err))
}
