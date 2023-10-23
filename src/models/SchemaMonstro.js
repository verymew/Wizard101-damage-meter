const mongoose = require('mongoose');
const {Schema} = mongoose;

const Monstro = new Schema({
    criador: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    damage: {
        type: Number,
        require: true
    },
    piercing: {
        type: Number,
        require: true
    },
    resist: {
        type: Number,
        require: true
    },
    incomingboost: {
        type: Number,
        required: true
    },
    role: { 
        type: Number,
    }
})


const Monster = mongoose.model('Monstro', Monstro);
module.exports = Monster; //variavel exportada;