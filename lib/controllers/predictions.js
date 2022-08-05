const { Router } = require('express');
const { Predictions } = require('../models/Predictions');

module.exports = Router()

  .get('/:id', async (req, res, next) => {
    try {
      const data = await Predictions.getById(req.params.id);
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
      const data = await Predictions.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const data = await Predictions.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

;
