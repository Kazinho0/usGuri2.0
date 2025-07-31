const mongoose = require('mongoose');

// URI de conexão do MongoDB. 
// Em um projeto real, é uma prática de segurança armazenar isso em um arquivo .env 
// e acessá-lo via process.env.MONGO_URI, para não expor suas credenciais no código.
const MONGO_URI = 'mongodb+srv://Kazinho:kazinho3344@cluster0.xyftxx8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
    try {
        // Tenta estabelecer a conexão com o banco de dados
        await mongoose.connect(MONGO_URI);

        console.log('MongoDB Conectado com sucesso!');

    } catch (err) {
        // Em caso de erro na conexão, exibe a mensagem de erro no console
        console.error('Erro ao conectar ao MongoDB:', err.message);

        // Encerra a aplicação com um código de falha (1).
        // Se o banco de dados não conecta, a aplicação não pode funcionar corretamente.
        process.exit(1);
    }
};

// Exporta a função para que ela possa ser importada e chamada no server.js
module.exports = connectDB;