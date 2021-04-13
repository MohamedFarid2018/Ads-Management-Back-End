const mongoose = require('mongoose');
const {Schema} = mongoose;

const adSchema = new Schema({
    type: {type: String, enum: ["free", "paid"]},
    title: {type: String, trim: true},
    description: {type: String},
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
    advertiser: {type: Schema.Types.ObjectId, ref: 'User'},
    startDate: {type: Date},
    endDate: {type: Date},
    image: {type: String, default: ""},
    isArchived: {type: Boolean, default: false},
    translation: {},
});

module.exports = mongoose.model('Ad', adSchema);
