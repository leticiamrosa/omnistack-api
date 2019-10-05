// Tudo que é relacionado a sessao do usuario
// login, logout, listagem de usuarios logados
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authConfig = require("../config/auth");
const User = require("../models/User");

// Dentro do controller temos 5 metodos
// #index, #show, #store, #update, #destroy

/*  
  index => Um metodo que retorna uma listagem de sessoes
  show => Um metodo que retorna apenas uma sessao
  store => Um metodo que cria uma sessao
  update => Um metodo que altera uma sessao
  destroy => Um metodo que remove uma essao
*/

// generation token
function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
}

module.exports = {
  async store(req, res) {
    const { email, name, password } = req.body;

    try {
      if (await User.findOne({ email })) {
        return res.status(400).send({ error: "O usuário já existe" });
      }

      const user = await User.create({ name, email, password });

      user.password = undefined;

      return res.send({
        user,
        token: generateToken({ id: user._id })
      });
    } catch (error) {
      return res
        .status(400)
        .send({ error: "Não foi possível registrar o usuário" });
    }
  },

  async auth(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(400).send({ error: "User not found" });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).send({ error: "Invalid password" });
      }

      user.password = undefined;

      return res.send({
        user,
        token: generateToken({ id: user.id })
      });
    } catch (error) {
      return res.status(400).send({ error: error });
    }
  },

  async update(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).send({ error: "User not found" });
      }
    } catch (err) {
      res.status(400).send({ error: "Erro on forgot password, try again" });
    }
  }
};
