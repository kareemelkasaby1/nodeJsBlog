const mongoCon = require('mongoose')

const usersSchema = new mongoCon.Schema({
    firstName: { type: String, required: true, maxlength: 20, minlength:3 },
    lastName: { type: String, required: true, maxlength: 20, minlength:3 },
    password: { type: String, required: true, minlength: 10 },
    dob: { type: Date, required: true, min: new Date('04-03-1992') },
    email: { type: String, match: /.+@.+\..+/, unique: true, index: true },
    gender: { type: String, enum: ['f','m'] },
    phoneNum: {type: String, required: true, maxlength: 11, minlength: 11, unique: true}
})

const usersModel = mongoCon.model('Users',usersSchema)

module.exports = usersModel