const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Servir arquivos estáticos da pasta atual (usGuri2.0)
app.use(express.static(__dirname));

// Rota /login para servir o main.html
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});