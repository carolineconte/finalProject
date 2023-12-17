const { validationResult } = require('express-validator')

const validate = (req, res, next) => {
    //toda req retorna os possiveis erros
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        return next()
    }

    //se houver erros na requisicao
    const extractedErrors = []

    //transforma em array todos os erros, mapeia e pusha
    errors.array().map((err) => extractedErrors.push(err.msg))

    //req nao foi bem sucedida
    return res.status(422).json({
        errors: extractedErrors
    })
}

module.exports = validate