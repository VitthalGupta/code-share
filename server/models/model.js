const mongoose = require('mongoose');

const urlSchema= new mongoose.Schema({
    urlCode: String,
    shortUrl: String,
    pasteData: String,
    date: {type: String, default: Date.now()},
    expiration: String,
    encrypt: {type: String, default: 'false'},
    encryptkey: String
})

module.exports = mongoose.model('urls', urlSchema);