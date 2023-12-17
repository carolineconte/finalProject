const mongoose = require('mongoose')
const vetProfile = require('../models/vetProfile')

const newVetProfile = async (req, res) => {

  const { _id, name, email, role, specialization, addressStreet, addressN, addressCity, addressCAP,
    addressCountry, contactPhone, contactCell, schedule, bio } = req.body

  const image = req.file;

  //Criar usuario
  const newProfile = await vetProfile.create({
    _id, name, email, role, image, specialization,
    addressStreet, addressN, addressCity, addressCAP,
    addressCountry, contactPhone, contactCell, schedule, bio
  })

  res.status(201).json(
    newProfile
  )
}

const vetProfileById = async (req, res) => {

  const { id } = req.params

  try {
    const user = await vetProfile.findById(id)
    if (!user) {
      res.status(404).json({ errors: ['Notfound'] })
      return
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({ errors: ['Notfound'] })
    return
  }
}

const updateProfile = async (req, res) => {

  const { _id, name, email, specialization, addressStreet, addressN, addressCity, addressCAP,
    addressCountry, contactPhone, contactCell, schedule, bio
  } = req.body

  let image = null
  if (req.file) {
    image = req.file
  }

  const user = await vetProfile.findById(_id).select("-password")

  user.name = name
  user.email = email
  user.specialization = specialization
  user.addressStreet = addressStreet
  user.addressN = addressN
  user.addressCity = addressCity
  user.addressCAP = addressCAP
  user.addressCountry = addressCountry
  user.contactPhone = contactPhone
  user.contactCell = contactCell
  user.schedule = schedule
  user.bio = bio
  user.image = image

  await user.save()

  res.status(200).json(user)
}

const vetsGetAll = async (req, res) => {

  try {
    const vets = await vetProfile.find({})

    if (!vets) {
      res.status(404).json({ errors: ['Not found'] })
      return
    }
    res.status(200).json(vets)

  } catch (error) {
    res.status(404).json({ errors: ['Internal Error'] })
    return
  }
}

module.exports = {
  newVetProfile,
  vetProfileById,
  updateProfile,
  vetsGetAll
}