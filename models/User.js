const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, "Please enter a first name"]
        },
        lastname: {
            type: String,
            required: [true, "Please enter a last name"]
        },
        email: {
            type: String,
            required: [true, "Please enter a email"]
        },
        password: {
            type: String,
            required: [true, "Please enter a password"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Users", UserSchema);

