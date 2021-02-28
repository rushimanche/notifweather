require('dotenv').config()
const config = require('./common/config/env.config.js');

const path = require('path');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const AuthorizationRouter = require('./authorization/routes.config');
const UsersRouter = require('./users/routes.config');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());

const apiRouter = new express.Router();
AuthorizationRouter.routesConfig(apiRouter);
UsersRouter.routesConfig(apiRouter);
apiRouter.use('*', (req, res) => {
    res.status(404).send({ error: 'Not found' });
});
app.use('/api', apiRouter);

// serving frontend assets from the dist folder
const clientDistPath = path.resolve(__dirname, '../client/dist');
app.use('/', express.static(clientDistPath));

// server index.html on every other route as history api fallback
const indexPath = path.resolve(clientDistPath, './index.html');
app.use((req, res) => { res.sendFile(indexPath); });

const port = process.env.PORT;
app.listen(port, function () {
    console.log('app listening at port %s', port);
});
