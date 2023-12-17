const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema(
    {
        _id: { type: mongoose.Types.ObjectId, required: true},
        name: { type: String },
        role: { type: String },
        image: { type: Object },
        specialization: { type: String },
        addressStreet: { type: Object },
        addressN: { type: Object },
        addressCity: { type: Object },
        addressCAP: { type: Object },
        addressCountry: { type: Object },
        contactPhone: { type: Object },
        contactCell: { type: Object },
        schedule: { type: Object },
        bio: { type: String },
    },
    {
        timestamps: true
    }
)

const vetProfile = mongoose.model("VetProfiles", ProfileSchema);

module.exports = vetProfile;