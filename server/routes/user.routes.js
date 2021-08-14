const UserController = require('../controllers/user.controller')
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/users', UserController.findAllUsers);
    app.get('/api/users/:id', UserController.findOneSingleUser);
    app.put('/api/users/:id', UserController.updateExistingUser);
    app.post('/api/create', UserController.Register);
    app.post('/api/login', UserController.login);
    app.delete('/api/users/:id', UserController.deleteAnExistingUser);
    app.get('/api/usersjoin/:idt/:idu', UserController.joinTrip);
    app.get('/api/usersunjoin/:idt/:idu', UserController.unjoinTrip);
    app.get('/api/user/trips/:id',UserController.findUsersByTrip);
}
