
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { findUserByUsername, registerUser, getAllUsers } = require('../service/userService');

router.post('/register', (req, res) => {
  const { username, password, isFavored } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
  if (findUserByUsername(username)) return res.status(409).json({ error: 'Usuário já existe' });
  const hash = bcrypt.hashSync(password, 8);
  try {
    registerUser({ username, password: hash, isFavored });
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
  const user = findUserByUsername(username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
  res.json({ message: 'Login realizado com sucesso' });
});

router.get('/', (req, res) => {
  res.json(getAllUsers());
});

module.exports = router;
