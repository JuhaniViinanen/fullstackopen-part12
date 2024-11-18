const express = require('express');
const router = express.Router();

const redis = require('../redis')

router.get('/', async (req, res) => {
  const added_todos = await redis.getAsync('added_todos')

  const statistics = {
    'added_todos': added_todos ? Number(added_todos) : 0
  }

  res.send(statistics);
});

module.exports = router;
