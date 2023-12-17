const mongoose = require('mongoose')

const ProfileOwnerSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String },
    image: { type: Object },
    pets: [{ type: mongoose.Types.ObjectId, ref: 'PetProfile' }], // Referência aos perfis dos pets
    favorites: { type: Array },
    reminders: { type: Array },
   
  },
  {
    timestamps: true
  }
)

const ownerProfile = mongoose.model("OwnerProfiles", ProfileOwnerSchema);

module.exports = ownerProfile;