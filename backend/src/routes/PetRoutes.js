const express = require('express')
const router = express.Router();

//controller
const { getPetById,addInfoPetProfile,deletePetProfile,changeImageProfile } = require('../controllers/petController')

//middlewares 
const validate = require('../middlewares/Validation')
const tokenVal = require('../middlewares/tokenval')
const { imageUpload } = require('../middlewares/imgUpload')

router.get('/petprofile/:id', getPetById)
router.put('/petprofile/:id',tokenVal, validate,addInfoPetProfile)
router.patch('/petprofile/updateImage',tokenVal, imageUpload.single('image'), changeImageProfile)
router.delete('/petprofile/:id', deletePetProfile)


module.exports = router