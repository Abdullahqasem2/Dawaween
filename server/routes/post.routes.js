const PostController = require('../controllers/post.controller');
module.exports = function(app){
    app.post('/api/post', PostController.createPost);
}
