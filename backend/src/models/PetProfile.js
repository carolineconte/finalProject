const mongoose = require('mongoose');

const PetProfileSchema = new mongoose.Schema(
  {
    name: { type: String },
    image: { type: Object },
    owner: { type: mongoose.Types.ObjectId, ref: 'ownerProfiles' }, // Referência ao perfil do proprietário
    age: { type: String },
    color: { type: String },
    gender: { type: String },
    microchip: { type: String },
    birth: { type: String },
    weight: { type: String },
    breed: { type: String },
    vaccines: { type: Array },
    dewormings: { type: Array },
    notes: { type: Array },
    consultations: { type: Array },
    reminders: { type: Array },
  },
  {
    timestamps: true
  }
);

const petProfile = mongoose.model('PetProfiles', PetProfileSchema);

module.exports = petProfile;
