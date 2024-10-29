const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,

    },
    cart: [{
        type: Schema.Types.ObjectId, ref: 'product'
    }]
}, {
    timestamps: true,
    versionKey: false
})

const User = model('user', userSchema)

module.exports = User