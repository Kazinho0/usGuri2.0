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

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
