const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    categoryName : {
        type: String,
        required: true,
    },
    numberOfProducts : {
        type: Number,
        default: 0,
    }
})

module.exports = mongoose.model('Category', categorySchema)