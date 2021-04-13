const _ = require('lodash');
const ADMIN = 'admin';
const USER = 'user';
const GUEST = 'guest';
const ROLE_NAMES_ENUM = [
    ADMIN,
    USER,
    GUEST,
];
const ROLES_NAMES = {
    ADMIN,
    USER,
    GUEST,
};

module.exports = {ROLE_NAMES_ENUM, ROLES_NAMES};
