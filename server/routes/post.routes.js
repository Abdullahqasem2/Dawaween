const PostController = require('../controllers/post.controller');

//changed something
module.exports = function(app){
    app.post('/api/post/:uid', PostController.createNewPost);
    app.get('/api/post',PostController.findAllPosts);
    app.delete('/api/post/:id',PostController.deletePost);
}
