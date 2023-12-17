const mongoose = require('mongoose')
const ownerProfile = require('../models/OwnerProfile')
const vetProfile = require('../models/vetProfile')

const newOwnerProfile = async (req, res) => {

  const { _id, name } = req.body

  const image = req.file;

  //Criar perfil
  const newProfile = await ownerProfile.create({ _id, name, image })

  res.status(201).json(
    newProfile
  )
}

const ownerProfileById = async (req, res) => {

  const { id } = req.params

  try {
    const profile = await ownerProfile.findById(id)

    if (!profile) {
      res.status(404).json({ errors: ['User not found'] })
      return
    }
    res.status(200).json(profile)
  } catch (error) {
    res.status(404).json({ errors: ['Notfound'] })
    return
  }
}

const updateProfile = async (req, res) => {
  const { vetID, ownerID, newReminder, deleteReminder, removeFavorite } = req.body;

   const image = req.file


  try {
    const owner = await ownerProfile.findById(ownerID);
    if (!owner) {
      return res.status(404).json({ error: 'Owner Profile not found' });
    }

    if (vetID) {
      const vet = await vetProfile.findById(vetID);
      if (!vet) {
        return res.status(404).json({ error: 'Vet Profile not found' });
      }

      const isFavorite = owner.favorites.some(fav => fav.vetID.toString() === vetID.toString());

      if (!isFavorite) {
        owner.favorites.push({
          vetID: vetID,
          vetName: vet.name,
          vetPhoto: vet.image.filename,
        });

      } else {
        return res.status(400).json({ error: 'Vet already in favorites' });
      }
    }

    if (removeFavorite) {
      const indexToRemove = owner.favorites.findIndex(fav => fav.vetID.toString() === removeFavorite.toString());

      if (indexToRemove !== -1) {
        owner.favorites = owner.favorites.filter((fav, index) => index !== indexToRemove);

      } else {
        console.log("Favorito não encontrado.");
      }
    }

    if (newReminder) {
      owner.reminders.push(newReminder)
    }

    if (deleteReminder) {
      const index = owner.reminders.indexOf(deleteReminder)
      owner.reminders.splice(index, 1)

    }

    if (image) {
      owner.image = image
    }

    await owner.save();
    res.status(200).json(owner);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  newOwnerProfile,
  ownerProfileById,
  updateProfile,
}