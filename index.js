const express = require('express')
const postsroutes = require('./routes/postsroutes.js')
const usersroutes = require('./routes/usersroutes.js')
const log = require('./middlewares/log')
const logReqBody = require('./middlewares/logReqBody')
const mongoCon = require('mongoose')

mongoCon.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
mongoCon.set('useFindAndModify', false);

const app = express()
app.use(log)
app.use(express.json())
app.use(logReqBody)
const port = 5050
app.use('/posts', postsroutes)
app.use('/users', usersroutes)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))