const { body } = require('express-validator');

const userCreateValidation = () => {
    return [
        body("email")
            .isString().withMessage('The input email is required.')
            .isEmail().withMessage('Format required: name@email.com.'),
        body("password")
            .isString().withMessage('Password is required.')
            .isLength({ min: 6 }).withMessage('The password must contain 6 characters.'),
        body("confirmPassword")
            .isString().withMessage('Confirm password is required.')
            .custom((value, { req }) => {
                if (value != req.body.password) {
                    throw new Error('Passwords are not the same')
                }
                return true
            }),
        body("role")
            .isString().withMessage('Define your role.'),
    ]
};

const logiValidation = () => {
    return [
        body("email")
            .isString().withMessage('The input email is required.')
            .isEmail().withMessage('Format required: name@email.com.'),
        body("password")
            .isString().withMessage('Password is required.')
    ]
}

const userUpdateValidation = () => {
    return[
        body('password').optional().isLength({ min: 6 }).withMessage('The password must contain 6 characters.'),
    ]
}

module.exports = {
    userCreateValidation,
    logiValidation,
    userUpdateValidation
}