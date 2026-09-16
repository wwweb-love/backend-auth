// http://sql1c-02/college_copy1/hs/student_lk//schedule/{StudentUID}/{DateStart}/{DateEnd}
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET записи по дате
router.get('/', async (req, res) => {
  try {
    const { date } = req.query;
    // Проверяем, передана ли дата
    if (!date) {
      return res.status(400).json({ error: 'Параметр date обязателен. Пример: ?date=20260804' });
    }
    
    // Проверяем формат даты (должно быть 8 цифр)
    if (!/^\d{8}$/.test(date)) {
      return res.status(400).json({ error: 'Неверный формат даты. Используйте YYYYMMDD (например, 20260804)' });
    }
    const result = await pool.query(`
      SELECT 
        id,
        date,
        time,
        subject,
        teacher,
        room,
        type
      FROM schedule
      WHERE date = $1
      ORDER BY id
    `, [date]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;