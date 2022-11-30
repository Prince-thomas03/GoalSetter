const moongose = require('mongoose')


const goalSchema = moongose.Schema({
    text: {
        type: String,
        required: [true, 'please enter the text']
    }
}, {
    timestamps: true
})

module.exports=moongose.model("goal",goalSchema)