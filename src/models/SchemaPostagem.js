const express = require('express')
const Mongoose = require('mongoose');
const Users = require('./Tabelausuario');
const { default: mongoose } = require('mongoose');
const {Schema} = Mongoose;

const postagem = new Schema({
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


const Post = mongoose.model('Post', postagem);
module.exports = Post;

