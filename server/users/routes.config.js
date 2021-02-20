const UsersController = require('./controllers/users.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');
const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/users', [
        UsersController.insert
    ]);
    app.get('/users', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.requirePermission(PAID),
        UsersController.list
    ]);
    app.get('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.requirePermission(FREE),
        PermissionMiddleware.requireIdenticalUser,
        UsersController.getById
    ]);
    app.patch('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.requirePermission(FREE),
        PermissionMiddleware.requireIdenticalUser,
        UsersController.patchById
    ]);
    app.delete('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.requirePermission(ADMIN),
        UsersController.removeById
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
