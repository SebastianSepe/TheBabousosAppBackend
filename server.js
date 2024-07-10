require('dotenv').config();

const express = require('express');
const http = require('http');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const usersRoutes = require('./routes/usersRoutes');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Express session configuration
app.use(expressSession({
    secret: "This is one hell of a secret",
    resave: false,
    saveUninitialized: false
}));

// Passport initialization and session management
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport configuration
require('./config/passport')(passport);

// Disable x-powered-by header
app.disable('x-powered-by');

// Routes
usersRoutes(app);

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

// Start server
server.listen(port, '127.0.0.1', () => {
    console.log(`Application NodeJS is running on ${server.address().address}:${server.address().port}`);
});

module.exports = {
    app: app,
    server: server
};
