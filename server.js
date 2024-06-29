require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');



// Routes
const usersRoutes = require('./routes/usersRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.disable('x-powered-by');

app.set('port', port);

// Called Routes
usersRoutes(app);

server.listen(3000, '127.0.0.1' || 'localhost', function() {
    console.log('Application NodeJS is running on ' + server.address().address + ':' + server.address().port);
});

// ERROR HANDLER
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal Server Error');
});


module.exports = {
    app: app,
    server: server
}