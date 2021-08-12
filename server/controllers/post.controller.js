const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');

module.exports.createNewPost = async (request, response) => {
      const { text, channel } = request.body;
      try{
          let newPost =await Post.create({text, channel})
          let user= await User.findByIdAndUpdate({'_id':request.params.uid},{$push:{posts:newPost}})
          let addedpost=await Post.findByIdAndUpdate({'_id':newPost._id},{$push:{user:user}})
          return response.json(addedpostToUser)
      }
      catch{err => response.status(400).json(err)}
}

module.exports.findAllPosts = (request,response) => {

  Post.find({}).populate('comments').populate('user')
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
