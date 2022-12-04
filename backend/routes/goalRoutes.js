const express = require('express')
const router = express()

const {  getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}=require('../controllers/goalControllers')
const {protect}=require('../middleware/authMiddleware')

//routes can be shorted end to the following also

// router.route('/').get(getGoals).post(setGoals)
// router.route('/:id').put(updateGoals).delete(deleteGoals)



router.get('/', protect,getGoals)

router.post('/',protect ,setGoal)


router.put('/:id',protect,updateGoal)


router.delete('/:id',protect,deleteGoal)

module.exports = router