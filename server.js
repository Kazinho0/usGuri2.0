const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

const uri = 'mongodb+srv://Kazinho:kazinho3344@cluster0.xyftxx8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB', err));
    
// Servir arquivos estáticos da pasta atual (usGuri2.0)
app.use(express.static(__dirname));

// Rota / para servir o main.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

// Rota /home para servir o home.html
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Rota /new_account para servir o new_account.html
app.get('/new_account', (req, res) => {
    res.sendFile(path.join(__dirname, 'new_account.html'));
});

// Schema do usuário
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Middleware para processar dados do formulário
app.use(express.urlencoded({ extended: true }));

// Rota para criar novo usuário
app.post('/new_account', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        const userExists = await User.findOne({ username, email });
        if (userExists) {
            return res.status(400).send('Usuário já existe');
        } else {
            await newUser.save();
            res.redirect('/home');
        }
    } catch (err) {
        res.status(500).send('Erro ao criar usuário: ' + err.message);
    }
});

// Rota para login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.redirect('/home');
        } else {
            res.redirect('/');
        }
    } catch (err) {
        res.status(500).send('Erro ao fazer login: ' + err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
