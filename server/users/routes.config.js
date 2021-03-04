/*
These are all the routes for most of the application. These routes will be called in the frontend.
*/

const UsersController = require('./controllers/users.controller');

exports.routesConfig = function (app) {
    app.post('/users', [
        UsersController.insert
    ]);
    app.post('/check', [
        UsersController.check
    ]);
    app.post('/home', [
        UsersController.findByEmail
    ]);
    app.post('/update', [
        UsersController.patchById
    ]);
    app.post('/subscribe', [
        UsersController.subscribe
    ]);
    app.post('/verifyCity', [
        UsersController.verifyCity
    ]);
};
