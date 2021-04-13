const Projection = require('./projection');

const baseUserLogin = '_id phone name email created_at roles token';
const baseUserBasicData = '_id phone name email created_at roles token';
module.exports = {
    pUserLogin: new Projection(baseUserLogin),
    pUserBasicData: new Projection(baseUserBasicData),
};
