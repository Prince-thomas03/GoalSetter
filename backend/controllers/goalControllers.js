const asyncHandler=require('express-async-handler')

const getGoals = asyncHandler(async(req, res) => {

    res.status(200).json({ message: "got all goals" })
})

const setGoals =asyncHandler( async(req, res) => {

    if (!req.body.text) {
        res.status(400)
        throw new Error("please  add the text")
    }

    res.status(200).json({ message: "all goals set" })
})

const updateGoals =asyncHandler( async(req, res) => {
    res.status(200).json({ message: `all goals got updated ${req.params.id}` })
})

const deleteGoals = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `delete all goals  ${req.params.id}` })
})

module.exports = {
    getGoals, setGoals, updateGoals, deleteGoals
}