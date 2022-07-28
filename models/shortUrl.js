const mongoose = require("mongoose")
const shortid = require('shortid')

const{Schema} = mongoose

const shortUrlSchema = new Schema({
    fullUrl:{
        type: String,
        required: true
    },
    shortUrl:{
        type: String,
        required: true,
        default: shortid.generate
    },
    clicks: {
        type: String,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('shortUrl', shortUrlSchema)