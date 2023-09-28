const Mongoose = require('mongoose');
const Schema = Mongoose;

new Monstro = new Schema({
    criador: {
        type: mongoose.Schema.Types.ObjectId,
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

const Monster = mongoose.model('Monstro', Monstro);
module.exports = Monster;