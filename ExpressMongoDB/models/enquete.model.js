
const mongoose = require('mongoose');

var enqueteSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    marca: {
        type: String
    },
    like: {
        type: Number
    },
    dislike: {
        type: Number
    }
});

mongoose.model('Enquete', enqueteSchema);