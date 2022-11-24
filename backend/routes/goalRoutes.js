const express = require('express')
const router = express()

const {getGoals,setGoals,updateGoals,deleteGoals}=require('../controllers/goalControllers')

//routes can be shorted end to the following also

// router.route('/').get(getGoals).post(setGoals)
// router.route('/:id').put(updateGoals).delete(deleteGoals)



router.get('/', getGoals)

router.post('/', setGoals)


router.put('/:id',updateGoals)


router.delete('/:id',deleteGoals)

module.exports = router