const mongoose = require('mongoose')
const User = require('../models/User')
const vetProfile = require('../models/vetProfile')
const ownerProfile = require('../models/OwnerProfile')
const petProfile = require('../models/PetProfile')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const jwtSecret = process.env.JWTSECRET

//GERAR TOKEN
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, { expiresIn: "7d" })
}

//Register user and sign in
const register = async (req, res) => {

    const { name, email, password, role } = req.body

    //Verificar se o usuario ja existe
    const user = await User.findOne({ email })

    if (user) {
        res.status(422).json({ errors: ['email already in use'] })
        return
    }

    // Gerar senha hash
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    //Criar usuario
    const newUser = await User.create({
        name,
        email,
        password: passwordHash,
        role,
    })

    //Criacao bem sucedida -> gerar token
    if (!newUser) {
        res.status(422).json({ errors: ['Error, please try later'] })
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
        role: newUser.role
    })
}

const login = async (req, res) => {
    const { name, email, password, role } = req.body

    const user = await User.findOne({ email })

    //Checar se usuario esta cadastrado
    if (!user) {
        res.status(404).json({ errors: ['User not found'] })
        return
    }

    //Checar senha
    if (!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({ errors: ['Invalid password'] })
        return
    }

    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        role: user.role,
        token: generateToken(user._id),

    })
}

//sessao
const getCurrentUser = async (req, res) => {
    const user = req.user
    res.status(200).json(user)
}

const update = async (req, res) => {

    const { password } = req.body
    const { id } = req.params

    const user = await User.findById(id).select("-password");

    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (password) {
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        user.password = passwordHash
    }

    await user.save()
    res.status(200).json(user)
}

const getUserById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({ errors: ['Not found'] })
            return
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ errors: ['Not found'] })
        return
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findByIdAndDelete(id)
        const Vetprofile = await vetProfile.findByIdAndDelete(id)
        const Userprofile = await ownerProfile.findByIdAndDelete(id)
        if(Userprofile){
            await petProfile.deleteMany({ owner: id });
        }

        res.status(200).send('Deletado')
    } catch (error) {
        res.status(404).json({ errors: ['Notfound'] })
        return
    }
}


module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
    deleteUser

}