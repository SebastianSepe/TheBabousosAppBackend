const UsersControllers = require('../controllers/usersController');

module.exports = (app) => {

    app.get('/api/users/getAll', UsersControllers.getAll);


    app.post('/api/users/register', UsersControllers.register);

}