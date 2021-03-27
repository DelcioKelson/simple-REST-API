const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true

    },
    id : {
        type: String,
        required : true
    },
    releaseDate: {
        type: Date,
        required : true,
        default: Date.now

    }

})

module.exports = mongoose.model('course', courseSchema)
