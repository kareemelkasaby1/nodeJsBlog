const mongoCon = require('mongoose')

const postsSchema = new mongoCon.Schema({
    author: { type: String, required: true },
    title: { type: String, required: true, maxlength: 50, minlength:3 },
    content: { type: String, required: true, maxlength: 200, minlength:3 },
})


const postsModel = mongoCon.model('posts',postsSchema)

module.exports = postsModel