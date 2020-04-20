const express = require('express')
const postsRouts = express.Router()
const json = express.json()
const postModel = require('../models/postsModel.js')
bodyParser = require('body-parser').json();

postsRouts.get('/', async (req, resp) => {
    try {
        const posts = await postModel.find({}).populate('author')
        resp.json(posts)

    } catch (error) {
        resp.json(error)
    }
})


postsRouts.get('/:id', async (req, resp) => {
    const {
        id
    } = req.params
    try {
        const post = await postModel.find({
            _id: id
        }).populate('author')
        resp.json(post)

    } catch (error) {
        resp.json(error)
    }
})

postsRouts.post('/',  bodyParser, async (req, resp) => {
    var {
        author,
        title,
        content
    } = req.body
    try {
        const createdPost = await postModel.create([{
            author: author,
            title: title,
            content: content,
        }])
        resp.json(createdPost)
        
    } catch (error) {
        resp.json(error)
    }
});

postsRouts.patch('/:id', bodyParser, async (req, res) => {
    const {
        id
    } = req.params
    const updatedValues = req.body
    try {
        const updatedPost = await postModel.findOneAndUpdate({
            _id: id
        }, {
            $set: updatedValues
        }, {
            returnOriginal: false
        })
        res.json(updatedPost)
        
    } catch (error) {
        res.json(error)
        
    }
})



postsRouts.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params
    try {
        const deletedPost = await postModel.findOneAndDelete({
            _id: id
        }, {
            returnOriginal: false
        })
        res.json(deletedPost)
        
    } catch (error) {
        res.json(error)
        
    }
})


module.exports = postsRouts