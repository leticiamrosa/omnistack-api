require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes");
const socketio = require("socket.io");
const http = require("http");

const port = 3003;

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(process.env.DBKEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connectedUsers = {};

io.on("connection", socket => {
  console.log("Usuario conectado", socket.id);

  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

// ensina ao express a usar json
app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

/* 
  @param 
  route - qual rota eu quero executar esse código; 
  function - recebe sempre dois parametros -> (req,res);
*/

/* 
   res -> representa a requisicao -> através dele é possivel pegar os parametros enviados via url;
   exemple: http://www.exemple.com/${search};
   req ->
*/

/* 
  Por ser uma API REST a resposta precisa ser em json
  Estrutura de dados -> Uma maneira de enviar dados para o backend e o front-end se comunicarem

  @param
  Enviar sempre objetos e arrays
*/

/* --- req.query --- */
/* -> Acessar query params  (para filtros) */

/* 
  A melhor maneira de enviar params pelo metodo GET
  seria atraves dos query params
  => sao params que colocamos na url mesmo
    => geralmente colocamos para indicar um filtro exemple: ?idade=20
      => utilizamos req.query para pegar os params de url
      
*/

/* --- req.params --- */
/* -> Acessar route params  (para edicao, delete) */
/* 
  Deletar Usuario pelo ID
  @params
    => Usa o Route Params
      => É um param que vai dentro da url 
      exemple: https://localhost:3000/users/1

  @verbo
    "PUT"
    @query
      /users/:id
      return req.params.id
*/

/* --- req.body --- */
/* -> Acessar corpo da request  (para criacao e edicao) */

server.listen(process.env.PORT || port, () =>
  console.log(`Server running ing localhost:${port}/`)
);
