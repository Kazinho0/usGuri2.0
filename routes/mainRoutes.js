const express = require('express');
const path = require('path');
const router = express.Router(); // Cria um gerenciador de rotas do Express

// Importa o Model de Usuário que acabamos de criar.
// O '../' significa "voltar um diretório", para sair da pasta 'routes' e encontrar a pasta 'models'.
const User = require('../models/User');

// --- ROTAS PARA SERVIR AS PÁGINAS HTML ---

// Rota para a página inicial de login (GET /)
router.get('/', (req, res) => {
    // Usamos path.join para construir o caminho do arquivo de forma segura.
    // '..', 'public', 'main.html' significa: volte uma pasta, entre em 'public', pegue 'main.html'.
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

// Rota para a página home (GET /home)
router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
});

// Rota para a página de criação de conta (GET /new_account)
router.get('/new_account', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'new_account.html'));
});


// --- ROTAS PARA PROCESSAR DADOS (LÓGICA) ---

// Rota que recebe os dados do formulário de login (POST /login)
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Procura no banco um usuário com o username e a senha fornecidos
        const user = await User.findOne({ username, password });

        if (user) {
            // Se encontrou o usuário, redireciona para a home
            res.redirect('/home');
        } else {
            // Se não encontrou, redireciona de volta para a página inicial (login)
            // Futuramente, você pode adicionar uma mensagem de erro aqui.
            res.redirect('/');
        }
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).send('Erro interno no servidor.');
    }
});

// Rota que recebe os dados do formulário de criação de conta (POST /new_account)
router.post('/new_account', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verifica se já existe um usuário com o mesmo email ou username
        const userExists = await User.findOne({ $or: [{ email: email }, { username: username }] });

        if (userExists) {
            // Se o usuário já existe, retorna um erro 400 (Bad Request)
            return res.status(400).send('Usuário ou e-mail já cadastrado.');
        }

        // Se não existe, cria uma nova instância do Model User
        const newUser = new User({ username, email, password });
        
        // Salva o novo usuário no banco de dados
        await newUser.save();

        // Redireciona para a página home após o sucesso
        res.redirect('/home');

    } catch (err) {
        console.error('Erro ao criar usuário:', err);
        res.status(500).send('Erro ao criar usuário: ' + err.message);
    }
});


// Exporta o router com todas as rotas configuradas para ser usado no server.js
module.exports = router;