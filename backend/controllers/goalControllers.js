// const asyncHandler = require('express-async-handler')
// //the below goal model 'Goal' have the moongse methods which is used to crud  in database 
// const Goal = require('../modals/goalModal.js')
// const User = require('../modals/userModals.js')



// //@desc get goals
// //@route GET/api/goals
// //@access private
// const getGoals = asyncHandler(async (req, res) => {
//     const goals = await Goal.find({ user: req.user.id })
//     console.log("this  is goals from get goal", goals);


//     console.log(goals);
//     res.status(200).json(goals)
// })



// //@desc Set goals
// //@route POST/api/goals
// //@access private

// const setGoals = asyncHandler(async (req, res) => {

//     if (!req.body.text) {
//         res.status(400)
//         throw new Error("please  add the text")
//     }

//     const goal = await Goal.create({
//         text: req.body.text,
//         user: req.user.id

//     })

//     res.status(200).json(goal)
// })




// //@DESC update goals
// //@route  UPDATE/api/goals
// const updateGoals = asyncHandler(async (req, res) => {

//     console.log("thisi is the params id from",req.params.id);

//     const goal = await Goal.findById(req.params.id)

//     console.log("this is goal from update goals", goal);

//     // const user = await User.findById(req.user.id)
//     // // Check for user
//     // if (!user) {
//     //     res.status(401)
//     //     throw new Error('User not found')
//     // }

//     // // Make sure the logged in user matches the goal user
//     // if (goal.user.toString() !== req.user.id) {
//     //     res.status(401)
//     //     throw new Error('User not authorized')
//     // }



//     if (!goal) {
//         res.status(400)
//         throw new Error('Goal not found')
//     }



//     let updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })


//     res.status(200).json(updatedGoal)
// })




// //@DESC update goals
// //@route  DELETE/api/goals

// const deleteGoals = asyncHandler(async (req, res) => {

//     console.log("thishis req.params.id", req.params.id);

//     const goal = await Goal.findById(req.params.id)
//     console.log("this is goal from delete goals", goal);

//     // // Check for user
//     // const user = await User.findById(req.user.id)
//     // if (!user) {
//     //     res.status(401)
//     //     throw new Error('User not found')
//     // }

//     // // Make sure the logged in user matches the goal user
//     // if (goal.user.toString() !== req.user.id) {
//     //     res.status(401)
//     //     throw new Error('User not authorized')
//     // }


//     if (!goal) {
//         res.status(400)
//         throw new Error("no goal to be deleted")
//     }

//     await goal.remove()

//     res.status(200).json({ message: `deleted that particular goals  ${req.params.id}` })
// })


// module.exports = {
//     getGoals, setGoals, updateGoals, deleteGoals
// }
const asyncHandler = require('express-async-handler')

const Goal = require('../modals/goalModal')
const User = require('../modals/userModals')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id })

  res.status(200).json(goals)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(goal)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  console.log('delete goals',goal);

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}