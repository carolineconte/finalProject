const mongoose = require('mongoose')
const petProfile = require('../models/PetProfile')
const ownerProfile = require('../models/OwnerProfile')

const newPetProfile = async (req, res) => {

  const { name, owner, weight, age, color, gender, microchip, birth, breed } = req.body

  const image = req.file;

  const newProfile = await petProfile.create({
    name, owner, image, age, weight, color, gender, microchip, birth, breed
  })

  // Adicionar a referência ao perfil do pet no array de pets do proprietário
  const ownerProfileInstance = await ownerProfile.findById(owner);

  if (!ownerProfileInstance) {
    return res.status(404).json({ error: 'Perfil do proprietário não encontrado' });
  }

  ownerProfileInstance.pets.push(newProfile._id);
  await ownerProfileInstance.save();

  res.status(201).json(
    newProfile
  )
}

const getPetsByOwnerId = async (req, res) => {
  const { id } = req.params

  try {
    const profilesByOwner = await petProfile.find({ owner: id });

    if (profilesByOwner.length === 0) {
      // Se o array estiver vazio, o proprietário não tem pets associados
      return res.status(404).json({ message: 'Owner not found or has no associated pets' });
    }

    // Retornar os perfis de pets encontrados
    return res.status(200).json(profilesByOwner);

  } catch (error) {
    res.status(500).json({ errors: ['Internal server error'] })
    return
  }
}

const getPetById = async (req, res) => {
  const { id } = req.params
  try {
    const petById = await petProfile.findById(id)

    if (!petById) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    return res.status(200).json(petById);
  } catch (error) {
    res.status(500).json({ errors: ['Internal server error'] })
    return
  }

}

const addInfoPetProfile = async (req, res) => {
  const { id } = req.params
  const { vaccine, vaccineDone, consultation, weight, deworming, vaccineToDelete, dewormingToDelete, consultationToDelete } = req.body

  try {
    const petById = await petProfile.findById(id)

    if (!petById) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    if (weight) {
      petById.weight = weight;
    }
    if (vaccine) {
      petById.vaccines.push(vaccine);
    }
    if (consultation) {
      petById.consultations.push(consultation);
    }
    if (deworming) {
      petById.dewormings.push(deworming);
    }
    if (vaccineToDelete) {
      const vaccineIndex = petById.vaccines.findIndex(vaccine => vaccine.id === vaccineToDelete);
      petById.vaccines.splice(vaccineIndex, 1);
    }
    if (dewormingToDelete) {
      const Index = petById.dewormings.findIndex(dewormings => dewormings.id === dewormingToDelete);
      petById.dewormings.splice(Index, 1);
    }
    if (vaccineDone) {
      const index = petById.vaccines.findIndex(vaccine => vaccine.id === vaccineDone);
      petById.vaccines[index].nextDate = '';
    }

    if (consultationToDelete) {
      const index = petById.consultations.findIndex(consultation => consultation.id === consultationToDelete)
      petById.consultations.splice(index, 1)
    }

    // Salvar as alterações no banco de dados
    await petById.save();

    res.status(200).json(petById)
  } catch (error) {
    res.status(500).json({ errors: ['Internal server error'] })
    return
  }
}

const changeImageProfile = async (req, res) => {
  const { id } = req.body;
  const image = req.file;

  try {
    // Assuming `petProfile` is a Mongoose model
    const petById = await petProfile.findById(id);

    if (!petById) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    // Assuming `image` is a property in your petProfile schema
    petById.image = image;

    // Save changes to the database
    await petById.save();

    // Respond with the updated pet profile
    res.status(200).json(petById);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ errors: [`Internal server error: ${error.message}`] });
  }
};

const deletePetProfile = async (req, res) => {
  const { id } = req.params
  try {

    await petProfile.findByIdAndDelete(id)

    res.status(200).send('Profile Deleted')
  } catch (error) {
    res.status(500).json({ errors: ['Internal server error'] })
    return
  }
}

module.exports = {
  newPetProfile,
  getPetsByOwnerId,
  getPetById,
  addInfoPetProfile,
  deletePetProfile,
  changeImageProfile
}