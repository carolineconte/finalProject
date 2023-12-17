const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        email: { type: String },
        password: { type: String },
        role: { type: String }
    },
    {
        timestamps: true
    }
)

const user = mongoose.model("users", UserSchema);

module.exports = user;