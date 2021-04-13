const User = require('../ModelsFactory').create('User');
const Category = require('../ModelsFactory').create('Category');
const Tag = require('../ModelsFactory').create('Tag');
const Ad = require('../ModelsFactory').create('Ad');

module.exports = {
    User,
    Category,
    Tag,
    Ad,
};
