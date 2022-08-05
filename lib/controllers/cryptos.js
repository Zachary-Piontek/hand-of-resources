const { Router } = require('express');
const { Cryptos } = require('../models/Cryptos');


module.exports = Router()

  .get('/', async (req, res, next) => {
    try {
      const data = await Cryptos.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  
;
