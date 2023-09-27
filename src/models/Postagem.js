const { text } = require('body-parser');
const express = require('express');
const { default: mongoose } = require('mongoose');
const Mongoose = require('mongoose')
const {Schema} = Mongoose;

const novaPostagem = new Schema({
    tags: {
        type: [{ type: String }]
    },
    pnome: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    },
    idauthor: {
        type: mongoose.Schema.type.ObjectId,
        red: 'User'
    },
    conteudo: {
        type: String,
        required: true
    }
})

