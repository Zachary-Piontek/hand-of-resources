const { Router } = require('express');
const { Favorites } = require('../models/Favorites');

module.exports = Router()

  .get('/:id', async (req, res, next) => {
    try {
      const data = await Favorites.getById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const data = await Favorites.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

;
