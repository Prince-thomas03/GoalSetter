const moongoose = require('mongoose')

const userSchema = moongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add a name ']
    },
    email: {
        type: String,
        required: [true, 'please add a email'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'please add a password']
    },
}, {
    timestamps: true
})


module.exports = moongoose.model('User', userSchema) 