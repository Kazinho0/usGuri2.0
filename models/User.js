const mongoose = require('mongoose');

// Define o "molde" ou a estrutura para os documentos na coleção de usuários.
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, // O campo é obrigatório
        unique: true      // Garante que não hajam dois usuários com o mesmo nome
    },
    email: { 
        type: String, 
        required: true,
        unique: true      // Garante que não hajam dois usuários com o mesmo email
    },
    password: { 
        type: String, 
        required: true 
    }
});

// Cria e exporta o Model 'User' a partir do schema definido.
// É através do Model que faremos todas as operações no banco de dados (criar, ler, atualizar, deletar).
module.exports = mongoose.model('User', userSchema);