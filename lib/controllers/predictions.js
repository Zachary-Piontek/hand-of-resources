const { Router } = require('express');
const { Predictions } = require('../models/Predictions');

module.exports = Router()

  .get('/', async (req, res, next) => {
    try {
      const data = await Predictions.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

;
