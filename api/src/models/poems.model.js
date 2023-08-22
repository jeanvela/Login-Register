const { Schema, model } = require('mongoose')

const poemSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
}, {
    timestamps: true
})

module.exports = model('Poem', poemSchema)