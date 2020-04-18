const express = require('express')
const postsRouts = express.Router()
const json = express.json()
const postModel = require('../models/postsModel.js')
bodyParser = require('body-parser').json();

postsRouts.get('/', (req, resp) => {
    postModel.find({}, (err, res) => {
        if (!err) {
            return resp.json(res)
        }
    })
})

postsRouts.get('/:id', (req, resp) => {
    const {
        id
    } = req.params    
    postModel.find({
        _id: id
    }, (err, post) => {
        if (!err) {
            return resp.json(post)
        }
        else{
            return resp.json(err)
        }
    })
})

postsRouts.post('/', bodyParser, (req, resp) => {
    var {author,title,content} = req.body
    postModel.create([{
        author: author,
        title: title,
        content: content,
    }], (err,post) =>{
      if(!err) return resp.json(post)
      return resp.send(err)
   })
  });

postsRouts.patch('/:id', bodyParser, (req, res) => {
    const  { id }  = req.params
    const updatedValues = req.body    
    postModel.findOneAndUpdate({ _id: id}, {$set: updatedValues},{returnOriginal: false},function(err, post) {
        if (!err){
            return res.json(post)
        }
        else return res.json(err)
      });
})



postsRouts.delete('/:id', (req, res) => {
    const  { id }  = req.params
    postModel.findOneAndDelete({ _id: id},{returnOriginal: false},function(err, post) {
        if (!err){
            return res.json(post)
        }
        else return res.json(err)
      });
})


module.exports = postsRouts