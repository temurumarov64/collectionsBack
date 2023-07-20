const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = function (id) {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "24h" });
};

const verifyJWT = function (token) {
  return jwt.verify(token, process.env.SECRET_KEY);
};

class UsersController {
  async signup(req, res) {
    const { name, email, password } = req.body;
    const role = "user";

    if (!email && !password) {
      return res
        .status(400)
        .json({ error: "Email or password have not been completed" });
    }

    let passLength = [...password].length;
    if (passLength < 6) {
      return res
        .status(400)
        .json({ error: "Password should be at least 6 characters" });
    }

    const uniqueUser = await User.findOne({ where: { email } });
    if (uniqueUser) {
      return res
        .status(409)
        .json({ error: "User with such e-mail already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 1);

    try {
      const user = await User.create({
        name,
        email,
        role,
        password: hashPassword,
      });
      res.json({ user });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User has not been found" });
    }
    const role = user.role;

    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({ error: "Credentials are incorrect" });
    }
    const token = generateJwt(user.id);
    return res.status(200).json({ token: token, role: role, user_id: user.id });
  }

  async verifyToken(req, res) {
    return verifyJWT(req.headers.authorization);
  }

  async getAll(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      await User.destroy({ where: { id } });
      return res.status(200).json({ msg: "User has been deleted" });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }
}

module.exports = new UsersController();
