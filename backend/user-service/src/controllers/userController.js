const userService = require('../services/userService');

function register(req, res, next) {
  try {
    const user = userService.register(req.body);
    res.status(201).json({ data: user });
  } catch (err) {
    next(err);
  }
}

function login(req, res, next) {
  try {
    const result = userService.login(req.body);
    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
