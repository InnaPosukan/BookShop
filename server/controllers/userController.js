const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');

const generateJwt = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY,
    {
      expiresIn: '24h',
    }
  );
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Incorrect email or password'));
    }
    try {
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(ApiError.badRequest('User with this email address already exists'));
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, role, password: hashPassword });
      await Basket.create({ userId: user.id });
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (error) {
      return next(ApiError.internal('Registration failed. Please try again later.'));
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "User is not found" });
      }
      const comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (error) {
      console.error("Error during login:", error); // Вывод ошибки в консоль
      return res.status(500).json({ message: "Login failed. Please try again later." });
    }
  }

  async check(req, res, next) {
    try {
      const token = generateJwt(req.user.id, req.user.email, req.user.role);
      return res.json({ token });
    } catch (error) {
      return next(ApiError.internal('Token generation failed. Please try again later.'));
    }
  }
}

module.exports = new UserController();
