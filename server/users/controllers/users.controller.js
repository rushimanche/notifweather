/*
This is the primary controller for the backend. The routes will call functions from here.
*/

const UserModel = require('../models/users.model');
const crypto = require('crypto');

//Creates new user in database.
exports.insert = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    UserModel.createUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

//Updates user data with passed in email.
exports.patchById = (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    UserModel.patchUser(req.params.email, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

//Deletes user based on ID that is passed in.
exports.removeById = (req, res) => {
    UserModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
};

//Gets user based on ID.
exports.getById = (req, res) => {
    UserModel.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

//Check Weather for a city.
exports.check = async (req, res) => {
    res.send('' + await UserModel.check(req.body.city));
};

//Finds user based on passed in email.
exports.findByEmail = async (req, res) => {
    res.send(await UserModel.findByEmail(req.body.email));
};

//Subscribes user to notifications and updates state in database.
exports.subscribe = async (req, res) => {
    UserModel.patchUser(req.params.email, req.body)
    .then((result) => {
        res.status(204).send({});
    });
    res.send(await UserModel.subscribe(req.body.city, req.body.number, req.body.email, req.body.time, req.body.state));
};

//Verifies if city is a real city.
exports.verifyCity = async (req, res) => {
    res.send('' + await UserModel.verifyCity(req.body.city));
};