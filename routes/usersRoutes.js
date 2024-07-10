const UsersControllers = require('../controllers/usersController');

module.exports = (app) => {

    //This is the route to get all users
    app.get('/api/users/getAll', UsersControllers.getAll);


    //This is the route to register a user
    app.post('/api/users/register', UsersControllers.register);

    //This is the route to login a user
    app.post('/api/users/login', UsersControllers.login);

}