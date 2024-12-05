const express = require('express')

//controller functions
const {signupUser, loginUser, userBasicDetails, getLeaveDetails, getAllUsers, updateUserType} = require('../../controllers/userController/userController')
//const requireAuth = require('../../middleware/requireAuth')

const router = express.Router()

//Login Route
router.post('/login', loginUser)

//Signup Route
router.post('/signup', signupUser)

//Basic Info Route
router.get('/basic-details', userBasicDetails)

//retrieving all users
router.get('/get-allusers', getAllUsers)

//update user type
router.put('/updateusertype', updateUserType)

module.exports = router 