const { verify } = require("../helpers/token");
const { Pool } = require('pg');

// Подключение к базе данных
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

module.exports = async function(req, res, next) {
    // Проверяем наличие токена в cookies
    if (!req.cookies.token) {
        return res.status(401).json({ error: "Пользователь не авторизован. Авторизуйтесь!" });
    }

    try {
        // Декодируем токен
        const tokenData = verify(req.cookies.token);
        
        // Ищем пользователя в PostgreSQL по id
        const client = await pool.connect();
        
        try {
            const result = await client.query(
                `SELECT id, last_name, first_name, middle_name, specialty, group_name, login, password_hash, email, snils
                 FROM students_copy
                 WHERE id = $1`,
                [tokenData.id]
            );
            
            const user = result.rows[0];
            
            if (!user) {
                return res.status(401).json({ error: "Пользователь не найден" });
            }
            
            // Добавляем пользователя в объект запроса
            req.user = user;
            
            next();
            
        } finally {
            client.release();
        }
        
    } catch (error) {
        console.error('Ошибка авторизации:', error.message);
        return res.status(401).json({ error: "Ошибка авторизации" });
    }
};