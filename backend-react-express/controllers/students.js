// const UserModel = require("../models/User")
const bcrypt = require("bcrypt")
const { generate, verify } = require("../helpers/token")
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const authorize = async (login, password) => {
    const client = await pool.connect();

    try {
        const result = await client.query(
            `SELECT id, name, specialty, group_name, login, password, email, snils 
             FROM students 
             WHERE login = $1`,
            [login]
        );

        const user = result.rows[0];

        if (!user) throw new Error("Пользователь не найден");

        const isPasswordMatch = await bcrypt.compare(password, user.password);

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
            `SELECT id, name, specialty, group_name, login, password, email, snils 
             FROM students_1c 
             WHERE snils = $1`,
            [snils]
        );

        const user = findResult.rows[0];

        if (!user) {
            throw new Error("Пользователь с таким СНИЛС не найден");
        }


        if (user.login && user.password) {
            throw new Error("Пользователь уже зарегистрирован!")
        }


        // Проверяем, не занят ли login другим пользователем
        if (login) {
            const loginCheck = await client.query(
                `SELECT id FROM students
                 WHERE login = $1 AND id != $2`,
                [login, user.id]
            );

            if (loginCheck.rows.length > 0) {
                throw new Error("Этот login уже используется другим пользователем");
            }
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаём нового студента
        const insertResult = await client.query(
            `INSERT INTO students 
            (name, specialty, group_name, login, password, email, snils)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, name, specialty, group_name, login, password, email, snils`,
            [user.name, user.specialty, user.group_name, login, hashedPassword, email, user.snils]
        );

        const createdUser = insertResult.rows[0];

        // Подтверждаем транзакцию
        await client.query('COMMIT');

        // Генерируем токен
        const token = generate({ id: createdUser.id });

        return {
            success: true,
            message: "Регистрация успешно завершена",
            token,
            user: createdUser
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