// Importações de Módulos Essenciais
const express = require('express');
const path = require('path');

// Importações de Módulos Locais (que criaremos a seguir)
const connectDB = require('./config/db'); // Função para conectar ao banco de dados
const mainRoutes = require('./routes/mainRoutes'); // Arquivo que conterá todas as rotas

// Inicialização do Aplicativo Express
const app = express();

// Definição da Porta do Servidor
const PORT = process.env.PORT || 3000;

// Conectar ao Banco de Dados MongoDB
connectDB();

// --- Configuração de Middlewares ---

// Middleware para servir arquivos estáticos (CSS, JS, imagens) da pasta 'public'
// É uma boa prática mover arquivos estáticos para uma pasta dedicada como 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para o Express entender dados de formulários (URL-encoded)
app.use(express.urlencoded({ extended: true }));

// Middleware para o Express entender JSON
app.use(express.json());

// --- Rotas Principais ---
// Utiliza o roteador importado para todas as requisições
app.use('/', mainRoutes);


// --- Inicialização do Servidor ---
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});