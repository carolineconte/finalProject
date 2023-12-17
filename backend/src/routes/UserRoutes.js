const express = require('express')
const router = express.Router();

//controller
const { register, login, getCurrentUser, update, getUserById,deleteUser } = require('../controllers/UserController')

//middlewares 
const validate = require('../middlewares/Validation')
const { userCreateValidation, logiValidation, userUpdateValidation } = require('../middlewares/userValidation')
const tokenVal = require('../middlewares/tokenval')
const { imageUpload } = require('../middlewares/imgUpload')

//Routes
router.post('/register', userCreateValidation(), validate, register);
router.post('/login', logiValidation(), validate, login);
router.get('/account', tokenVal, getCurrentUser)

router.put('/:id', tokenVal, userUpdateValidation(),validate, update)

router.get('/:id', getUserById)
router.delete('/:id', tokenVal, deleteUser)


module.exports = router