const { Router } = require('express');
const { Cryptos } = require('../models/Cryptos');


module.exports = Router()

  .get('/:id', async (req, res, next) => {
    try {
      const data = await Cryptos.getById(req.params.id);
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
      const data = await Cryptos.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const data = await Cryptos.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  
;
