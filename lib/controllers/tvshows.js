const { Router } = require('express');
const { Tvshows } = require('../models/Tvshows');

// module.exports = Router().get('/', (req, res) => {
//   res.json([]);
// });
// use above to verify data is received past resp.status 200 part of test

module.exports = Router()

  .get('/', async (req, res, next) => {
    try {
      const data = await Tvshows.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
  
