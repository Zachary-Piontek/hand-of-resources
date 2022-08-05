const { Router } = require('express');
const { Favorites } = require('../models/Favorites');

module.exports = Router()
    
  .get('/', async (req, res, next) => {
    try {
      const data = await Favorites.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

;
