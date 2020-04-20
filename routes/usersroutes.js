const express = require('express')
const usersRouts = express.Router()
const json = express.json()
const userModel = require('../models/usersModel.js')
bodyParser = require('body-parser').json();

usersRouts.get('/', async (req, resp) => {
    try {
        const users = await userModel.find({})
        resp.json(users)

    } catch (error) {
        resp.json(error)
    }
})


usersRouts.get('/:id', async (req, resp) => {
    const {
        id
    } = req.params
    try {
        const user = await userModel.find({
            _id: id
        })
        resp.json(user)

    } catch (error) {
        resp.json(error)
    }
})

usersRouts.post('/', bodyParser, async (req, resp) => {
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

usersRouts.patch('/:id', bodyParser, async (req, res) => {
    const {
        id
    } = req.params
    const updatedValues = req.body
    try {
        const updateduser = await userModel.findOneAndUpdate({
            _id: id
        }, {
            $set: updatedValues
        }, {
            returnOriginal: false
        })
        res.json(updateduser)

    } catch (error) {
        res.json(error)

    }
})



usersRouts.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params
    try {
        const deletedUser = await userModel.findOneAndDelete({
            _id: id
        }, {
            returnOriginal: false
        })
        res.json(deletedUser)

    } catch (error) {
        res.json(error)

    }
})


module.exports = usersRouts