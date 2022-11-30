const asyncHandler = require('express-async-handler')

//the below goal model 'Goal' have the moongse methods which is used to crud  in database 
const Goal = require('../modals/goalModal')

//@desc get goals
//@route GET/api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()
    console.log(goals);
    res.status(200).json(goals)
})

//@desc Set goals
//@route POST/api/goals
//@access private

const setGoals = asyncHandler(async (req, res) => {

    if (!req.body.text) {
        res.status(400)
        throw new Error("please  add the text")
    }

    const goal = await Goal.create({
        text: req.body.text
    })

    res.status(200).json(goal)
})


//@DESC update goals
//@route  UPDATE/api/goals
const updateGoals = asyncHandler(async (req, res) => {

    let goal = Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    let updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })


    res.status(200).json(updatedGoal)
})


//@DESC update goals
//@route  DELETE/api/goals

const deleteGoals = asyncHandler(async (req, res) => {

    let goal = Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error("not goal to be deleted")
    }

    await goal.remove()

    res.status(200).json({ message: `deleted that particular goals  ${req.params.id}` })
})


module.exports = {
    getGoals, setGoals, updateGoals, deleteGoals
}