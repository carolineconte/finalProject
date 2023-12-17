const express = require('express')
const router = express.Router();

//controller
const { newVetProfile, vetProfileById, updateProfile, vetsGetAll } = require('../controllers/vetController')

//middlewares 
const validate = require('../middlewares/Validation')
const tokenVal = require('../middlewares/tokenval')
const { imageUpload } = require('../middlewares/imgUpload')

router.post('/newprofile', tokenVal, validate, imageUpload.single('image'), newVetProfile)
router.get('/profile/:id', vetProfileById)
router.put('/editprofile',tokenVal, validate, imageUpload.single('image'), updateProfile)

router.get('/list', vetsGetAll)

module.exports = router