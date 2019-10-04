// Tudo que é relacionado a sessao do usuario
// login, logout, listagem de usuarios logados

const User = require('../models/User');

// Dentro do controller temos 5 metodos
// #index, #show, #store, #update, #destroy

/*  
  index => Um metodo que retorna uma listagem de sessoes
  show => Um metodo que retorna apenas uma sessao
  store => Um metodo que cria uma sessao
  update => Um metodo que altera uma sessao
  destroy => Um metodo que remove uma essao
*/

module.exports ={
  
  async store(req, res) {
    const { email } = req.body;

    let user = await User.findOne({ email }); // validacao de email

    if(!user) {
      user = await User.create({ email });

    }

    return res.json(user);
  }

};