require('dotenv').config();

const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require('cors')


const server = express()

server.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
server.use(express.json())
server.use(cookieParser())
server.use(express.urlencoded({ extended: true }));

const authRouter = require('./routes/auth.js');
server.use('/api/auth', authRouter);

// Тестовый эндпоинт
server.get('/', (req, res) => {
  res.send('Сервер работает!');
});

server.listen(3000, () => console.log("Server started..."))