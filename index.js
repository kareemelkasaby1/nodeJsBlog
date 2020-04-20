const express = require('express')
const cookieParser = require('cookie-parser')
const postsroutes = require('./routes/postsroutes.js')
const usersroutes = require('./routes/usersroutes.js')
const signUpRouts = require('./routes/signUp')
const signInRouts = require('./routes/signIn')

const log = require('./middlewares/log')
const logReqBody = require('./middlewares/logReqBody')
const hashingPassword = require('./middlewares/hashingPassword')
const verifyToken = require('./middlewares/verifyToken')



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
app.use(cookieParser())
app.use('/signin', signInRouts)
app.use(hashingPassword)

app.use('/signup', signUpRouts)



app.use(verifyToken)
const port = 5050
app.use('/posts', postsroutes)
app.use('/users', usersroutes)

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))