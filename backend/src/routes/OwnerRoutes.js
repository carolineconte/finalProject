const express = require('express')
const router = express.Router();

//controller
const { newOwnerProfile, ownerProfileById, updateProfile} = require('../controllers/ownerController')
const { newPetProfile, getPetsByOwnerId, getPetById } = require('../controllers/petController')

//middlewares 
const validate = require('../middlewares/Validation')
const tokenVal = require('../middlewares/tokenval')
const { imageUpload } = require('../middlewares/imgUpload')

router.post('/newprofile', tokenVal, validate, imageUpload.single('image'), newOwnerProfile)
router.get('/profile/:id', ownerProfileById)
router.put('/profile/update',tokenVal, validate, imageUpload.single('image'), updateProfile)

router.post('/newpet', tokenVal, imageUpload.single('image'), newPetProfile)
router.get('/profile/:id/mypets', getPetsByOwnerId)
router.get('/petprofile/:id', getPetById)




module.exports = router