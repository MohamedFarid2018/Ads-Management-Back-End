const mongoose = require('mongoose');
const {Schema} = mongoose;

const categorySchema = new Schema({
    name: {type: String, trim: true},
    isArchived: {type: Boolean, default: false},
    translation: {},
});


module.exports = mongoose.model('Category', categorySchema);
