const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/tvshows', require('./controllers/tvshows'));
app.use('/movies', require('./controllers/movies'));
app.use('/favorites', require('./controllers/favorites'));
app.use('/cryptos', require('./controllers/cryptos'));
app.use('/predictions', require('./controllers/predictions'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
