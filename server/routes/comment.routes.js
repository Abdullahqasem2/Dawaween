const PostController = require('../controllers/comment.controller');
module.exports = function(app){
    app.post('/api/comment/:uid/:pid', PostController.createNewComment);
    app.get('/api/comment',PostController.findAllcomments);
    app.delete('/api/comment/:id',PostController.deletecomment)
}
