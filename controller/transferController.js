
const express = require('express');
const router = express.Router();
const { transfer, getTransfers } = require('../service/transferService');

router.post('/', (req, res) => {
  const { from, to, amount } = req.body;
  if (!from || !to || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Campos obrigatórios: from, to, amount' });
  }
  try {
    const result = transfer({ from, to, amount });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', (req, res) => {
  res.json(getTransfers());
});

module.exports = router;
