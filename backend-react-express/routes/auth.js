const express = require('express')
const router = express.Router({ mergeParams: true })

// middlewares
const authenticated = require("../middlewares/authenticated")

// controllers
const { authorize, registration } = require("../controllers/students")

// авторизация
router.get("/me", authenticated, async (req, res) => {
    try {
        const user = req.user
        res.send({ error: null, data: user })
    } catch(error) {
        res.send({ error: error.message, data: null })
    }
})

// login
router.post("/login", async (req, res) => {
    try {
        const { login , password } = req.body
        const { token, user } = await authorize(login, password)

        res.cookie("token", token, { httpOnly: true })
        .send({error: null, data: user})
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// register
router.post("/register", async (req, res) => {
    try {
        const { snils, login, password, email } = req.body
        const { success, message, token, user } = await registration(snils, login, password, email)

        res.cookie("token", token, { httpOnly: true })
        .send({error: null, data: {user: user} })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// logout
router.post("/logout", (req, res) => {
    try {
        res.cookie("token", "", { httpOnly: true })
        .send({error: null, data: null})
    } catch (error) {
        res.send({error: error.message, data: null})
    }
})

module.exports = router