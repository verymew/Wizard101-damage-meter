const { default: mongoose } = require('mongoose');
const Mongoose = require('mongoose');
const { Schema }= Mongoose;

const usuarioCadastro = new Schema ({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    damage: {
        type: Number,
        require: true
    },
    piercing: {
        type: Number,
        require: true
    },
    critical: {
        type: Number,
        require: true
    },
    resist: {
        type: Number,
        require: true
    },
    roles: {
        type: [{ String }]
    }
})

module.exports = Mongoose.model("userdoc", usuarioCadastro)