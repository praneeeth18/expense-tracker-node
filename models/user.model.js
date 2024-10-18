const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')

const UserSchema = mongoose.Schema(
    {
        userId: {
            type: Number,
            unique: true
        },
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

UserSchema.plugin(AutoIncrement, { inc_field: 'userId' });

module.exports = mongoose.model("Users", UserSchema);

