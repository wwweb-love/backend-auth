// const UserModel = require("../models/User")
const bcrypt = require("bcrypt")
const { generate, verify } = require("../helpers/token")
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});


// const authorize = async (login, password) => {
//     const user = await UserModel.findOne({ login })

//     if (!user) throw new Error("User not defined")

//     const isPasswordMatch = await bcrypt.compare(password, user.password)

//     if (!isPasswordMatch) throw new Error("Password invalid")

//     const token = generate({ id: user._id })

//     return { token, user }
// }

const authorize = async (login, password) => {
    const client = await pool.connect();
    
    try {
        const result = await client.query(
            `SELECT id, last_name, first_name, middle_name, specialty, group_name, login, password_hash, email, snils 
             FROM students_copy 
             WHERE login = $1`,
            [login]
        );
        
        const user = result.rows[0];
        
        if (!user) throw new Error("Пользователь не найден");
        
        const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
        
        if (!isPasswordMatch) throw new Error("Неверный пароль");
        
        const token = generate({ id: user.id });
        
        return { token, user };
        
    } finally {
        client.release();
    }
};

const registration = async (snils, login, password, email) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        
        if (!snils || !login || !password || !email) {
            throw new Error("Введите все данные")
        }
        
        // Ищем пользователя по СНИЛС
        const findResult = await client.query(
            `SELECT id, login, password_hash, snils, email 
             FROM students_copy 
             WHERE snils = $1`,
            [snils]
        );

        const user = findResult.rows[0];
        
        if (!user) {
            throw new Error("Пользователь с таким СНИЛС не найден");
        }
        

        if (user.login && user.password_hash) {
            throw new Error("Пользователь уже зарегистрирован!")
        }


        // Проверяем, не занят ли login другим пользователем
        if (login) {
            const loginCheck = await client.query(
                `SELECT id FROM students_copy 
                 WHERE login = $1 AND id != $2`,
                [login, user.id]
            );
            
            if (loginCheck.rows.length > 0) {
                throw new Error("Этот login уже используется другим пользователем");
            }
        }
        
        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Обновляем данные пользователя
        const updateResult = await client.query(
            `UPDATE students_copy 
             SET login = $1, password_hash = $2, email = $4, updated_at = NOW()
             WHERE id = $3
             RETURNING id, login, snils, last_name, first_name, middle_name, specialty, group_name`,
            [login, hashedPassword, user.id, email]
        );
        
        const updatedUser = updateResult.rows[0];
        
        // Подтверждаем транзакцию
        await client.query('COMMIT');
        
        // Генерируем токен
        const token = generate({ id: updatedUser.id });
        
        return { 
            success: true,
            message: "Регистрация успешно завершена",
            token, 
            user: updatedUser 
        };
        
    } catch (error) {
        // Откатываем транзакцию в случае ошибки
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

module.exports = { authorize, registration }