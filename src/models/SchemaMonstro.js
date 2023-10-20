const Mongoose = require('mongoose');
const {Schema} = Mongoose;

const Monstro = new Schema({
    criador: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Users',
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
    }
})

const Monster = Mongoose.model('Monstro', Monstro);
module.exports = Monster; //variavel exportada;