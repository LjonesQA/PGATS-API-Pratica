const { findUserByUsername, addUser } = require('../service/userService');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {
  const { username, password, favoredBy = [] } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
  if (findUserByUsername(username)) return res.status(409).json({ error: 'Usuário já existe' });
  const hash = bcrypt.hashSync(password, 8);
  addUser({ username, password: hash, balance: 10000, favoredBy });
  res.status(201).json({ message: 'Usuário registrado com sucesso' });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
  const user = findUserByUsername(username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
  res.json({ message: 'Login realizado com sucesso' });
};

exports.list = (req, res) => {
  const users = require('../model/database').users.map(u => ({ username: u.username, balance: u.balance, favoredBy: u.favoredBy }));
  res.json(users);
};
