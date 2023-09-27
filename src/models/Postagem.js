const express = require('express')
const Mongoose = require('mongoose');
const Users = require('./Tabelausuario');
const {Schema} = Mongoose;

const Enemy = new Schema({
    criador: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users',
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    title: {
        type: String,
        required: true
    },
})

