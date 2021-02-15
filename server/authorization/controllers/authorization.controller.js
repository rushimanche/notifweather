const jwtSecret = require('../../common/config/env.config.js').jwt_secret,
    jwt = require('jsonwebtoken');
const crypto = require('crypto');
const uuid = require('uuid');

exports.login = (req, res) => {
    try {
        let refresher = req.body.userId + jwtSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refresher).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, jwtSecret);
        let buffer = Buffer.from(hash);
        let refreshed_token = buffer.toString('base64');
        res.status(201).send({accessToken: token, refreshToken: refreshed_token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

exports.refreshed_token = (req, res) => {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, jwtSecret);
        res.status(201).send({id: token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};
