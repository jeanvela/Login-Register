const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
    }
}, {
    timestamps: true
})

module.exports = model('User', userSchema)