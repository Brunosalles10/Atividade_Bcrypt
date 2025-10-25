const users = []; // Array para armazenar os usuários
let nextId = 1; // Variável para gerar IDs únicos

// Função para adicionar um novo usuário
const addUser = (user) => {
  const newUser = {
    id: nextId++,
    username: user.username,
    email: user.email,
    passwordHash: user.passwordHash,
  };
  users.push(newUser);
  return newUser;
};

// Função para encontrar um usuário pelo nome de usuário
const findUserByUsername = (username) => {
  return users.find((u) => u.username === username);
};

module.exports = {
  users,
  addUser,
  findUserByUsername,
};
