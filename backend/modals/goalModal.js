// const moongose = require('mongoose')


// const goalSchema = moongose.Schema({

//     user: {

//         type: moongose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'User'

//     },


//     text: {
//         type: String,
//         required: [true, 'please enter the text']
//     }
// }, {
//     timestamps: true
// })

// module.exports = moongose.model("goal", goalSchema)

const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Goal', goalSchema)