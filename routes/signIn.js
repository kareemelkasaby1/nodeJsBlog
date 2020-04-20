const express = require('express')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
mongoose = require('mongoose')
const signInRouts = express.Router()
const json = express.json()
const userModel = require('../models/usersModel.js')

bodyParser = require('body-parser').json();


signInRouts.post('/', bodyParser, async (req, res) => {
    const jwtKey = 'koko'
    const jwtExpirySeconds = 300
    const {
        email,
        password
    } = req.body
    try {
        const user = await userModel.find({
            email: email
        })

        if (!await bcrypt.compare(password, user[0].password)) {
            return res.send("invalid Password Or Email")
        }

    } catch (error) {
        return res.json(error)
    }
    const token = jwt.sign({
        email
    }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
    })
    console.log('token:', token)

    res.cookie('token', token, {
        maxAge: jwtExpirySeconds * 1000
    })
    res.send("logined succesfuly")
});


module.exports = signInRouts