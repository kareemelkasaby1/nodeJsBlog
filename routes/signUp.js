const express = require('express')
mongoose = require('mongoose')
const signUpRouts = express.Router()
const json = express.json()
const userModel = require('../models/usersModel.js')

bodyParser = require('body-parser').json();


signUpRouts.post('/', bodyParser, async (req, resp) => {
    var {
        firstName,
        lastName,
        password,
        dob,
        email,
        gender,
        phoneNum
    } = req.body
    try {
        const createdPost = await userModel.create([{
            firstName: firstName,
            lastName: lastName,
            password: password,
            dob: dob,
            email: email,
            gender: gender,
            phoneNum: phoneNum
        }])
        resp.json(createdPost)

    } catch (error) {
        resp.json(error)
    }
});


module.exports = signUpRouts