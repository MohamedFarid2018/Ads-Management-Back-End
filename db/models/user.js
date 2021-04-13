const mongoose = require('mongoose');
const {Schema} = mongoose;
const crypto = require('../../helpers/crypto');
const {LANGUAGES_ENUM, LANGUAGES} = require('../../config/constants/languages');

const userSchema = new Schema({
    name: {type: String, trim: true},
    password: {type: String, trim: true},
    profileImage: {type: String},
    email:{type:String},
    phone: {type: String, trim: true},
    roles: {type: Array, default: ['user'], required: true},
    token: {type: String, trim: true},
    verifyPhone: {
        token: {type: String, trim: true},
        tokenTime: {type: Date},
        tokenExpiration: {type: Date}
    },
    forgetPasswordTime: {type: Date},
    isArchived: {type: Boolean, default: false},
});


userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = crypto.createHash(this.password);
    }
    if (this.isModified('phone')
        || this.isModified('roles')) {
        this.token = this.generateToken();
    }

    if (this.isNew) {
        this.token = this.generateToken();
    }

    next();
});


userSchema.methods.generateToken = function () {
    const token = crypto.generateJwtToken({
        sub: this._id,
        phone: this.phone,
        roles: this.roles,
    });
    return token;
};
userSchema.methods.generateSmsToken = function () {
    return crypto.generateRandomNumber();
};

// userSchema.index({name: 1});
module.exports = mongoose.model('User', userSchema);
