const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },  // подтвердил почту пользователь или нет
    activationLink: { type: String },
})

module.exports = model('User', UserSchema);