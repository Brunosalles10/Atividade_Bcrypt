const express = require("express");
const app = express();
const port = 3000;
const bcrypt = require("bcrypt");
const cors = require("cors");
const userModel = require("./models/userModel");

// Configuração do CORS
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Vamos ness!!!");
});

// Rota para gerar hash de senha
app.post("/hash-teste", async (req, res) => {
  const senha = req.body.senha;
  // Gerar o hash da senha usando bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashSenha = await bcrypt.hash(senha, salt);
  // Retornar o hash da senha como resposta
  res.json({ hash: hashSenha });
});

//rota  de registro de usuario
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  // Verificar se o usuário já existe
  if (userModel.findUserByUsername(username)) {
    return res.status(400).json({ message: "Usuário já existe" });
  }
  // Gerar o hash da senha
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  // Adicionar o novo usuário ao "banco de dados"
  const newUser = userModel.addUser({ username, email, passwordHash });
  res
    .status(201)
    .json({ message: "Usuário registrado com sucesso", user: newUser });
});

//login de usuario
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = userModel.findUserByUsername(username);
  if (!user) {
    return res.status(400).json({ message: "Usuário não encontrado" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Senha inválida" });
  }
  res.status(200).json({ message: "Login bem-sucedido", user: user });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
