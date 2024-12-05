const express = require('express')


const { saveShow, getMyShows, getAllShows } = require('../../controllers/showController/showController')

const router = express.Router()

//Add a show 
router.post('/add-event', saveShow)

//Get user shows
router.get('/get-myShows', getMyShows)

//Get all shows
router.get('/get-myAllShows', getAllShows)

module.exports = router 