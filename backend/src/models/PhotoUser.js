const mongoose = require('mongoose')

const PhotoSchema = new mongoose.Schema(
    {
        image: { type: String },
        title: { type: String },
        userId: mongoose.ObjectId,
    },
    {
        timestamps: true
    }
)

const photoUser = mongoose.model("photos-users", PhotoSchema);

module.exports = photoUser;