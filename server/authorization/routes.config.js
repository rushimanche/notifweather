/*
These are the routes for authentication that can be called from the frontend.
*/

const VerifyUserMiddleware = require('./middlewares/verify.user.middleware');
const AuthorizationController = require('./controllers/authorization.controller');
exports.routesConfig = function (app) {

    //Route for UserLogin. Logs in user and verifies their credentials.
    app.post('/auth', [
        VerifyUserMiddleware.verifyAuth,
        VerifyUserMiddleware.verifyCredentials,
        AuthorizationController.login
    ]);
};