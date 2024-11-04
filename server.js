// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Ваша статична папка (якщо потрібно)
app.use(express.static('public'));

// Обробка підключення клієнтів
io.on('connection', (socket) => {
    console.log('New client connected');

    // Обробка отримання повідомлення
    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
    });

    // Обробка відключення
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Запуск сервера
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
