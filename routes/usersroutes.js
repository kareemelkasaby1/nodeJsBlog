const express = require('express')
const usersRouts = express.Router()
const json = express.json()
const userModel = require('../models/usersModel.js')
bodyParser = require('body-parser').json();

usersRouts.get('/', (req, resp) => {
    userModel.find({}, (err, res) => {
        if (!err) {
            return resp.json(res)
        }
    })
})

usersRouts.get('/:id', (req, resp) => {
    const {
        id
    } = req.params    
    userModel.find({
        _id: id
    }, (err, user) => {
        if (!err) {
            return resp.json(user)
        }
        else{
            return resp.json(err)
        }
    })
})

usersRouts.post('/', bodyParser, (req, resp) => {
    var {firstName,lastName,password,dob,email,gender,phoneNum} = req.body
    userModel.create([{
        firstName: firstName,
        lastName: lastName,
        password: password,
        dob: dob,
        email: email,
        gender: gender,
        phoneNum: phoneNum
    }], (err,user) =>{
      if(!err) return resp.json(user)
      return resp.send(err)
   })
  });

usersRouts.patch('/:id', bodyParser, (req, res) => {
    const  { id }  = req.params
    const updatedValues = req.body    
    userModel.findOneAndUpdate({ _id: id}, {$set: updatedValues},{returnOriginal: false},function(err, user) {
        if (!err){
            return res.json(user)
        }
        else return res.json(err)
      });
})



usersRouts.delete('/:id', (req, res) => {
    const  { id }  = req.params
    userModel.findOneAndDelete({ _id: id},{returnOriginal: false},function(err, user) {
        if (!err){
            return res.json(user)
        }
        else return res.json(err)
      });
})


module.exports = usersRouts