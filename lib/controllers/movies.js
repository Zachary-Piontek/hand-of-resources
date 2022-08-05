const { Router } = require('express');
const { Movies } = require('../models/movies.js');

module.exports = Router()

  .get('/', async (req, res, next) => {
    try {
      const data = await Movies.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
;
