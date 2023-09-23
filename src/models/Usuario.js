const mongoose = require('mongoose');

const { Schema } = mongoose;

const usuarioSchema = new Schema ({
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
    }   
})

mongoose.model("usuario", usuarioSchema);