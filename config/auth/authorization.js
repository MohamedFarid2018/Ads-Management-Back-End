const AccessControl = require('accesscontrol');
const RESOURCE_NAMES = require('./resource_names');
const {ROLES_NAMES} = require('./roles');
//uploadingFiles.personal_files
const grantsObject = {
    [ROLES_NAMES.ADMIN]: {
        [RESOURCE_NAMES.USER]: {
            'read:any': ['*'], 'create:any': ['*'], 'delete:any': ['*'], 'update:any': ['*']
        },
        [RESOURCE_NAMES.ADS]: {
            'create:any': ['*'], 'read:any': ['*'], 'update:any': ['*'], 'delete:any': ['*'],
        },
        [RESOURCE_NAMES.CATEGORY]: {
            'create:any': ['*'], 'read:any': ['*'], 'update:any': ['*'], 'delete:any': ['*'],
        },
        [RESOURCE_NAMES.TAG]: {
            'create:any': ['*'], 'read:any': ['*'], 'update:any': ['*'], 'delete:any': ['*'],
        },
    },
    [ROLES_NAMES.USER]: {
        [RESOURCE_NAMES.USER]: {
            'read:own': ['*'], 'create:own': ['*'], 'delete:own': ['*'], 'update:own': ['*']
        },
        [RESOURCE_NAMES.ADS]: {
            'create:own': ['*'], 'read:any': ['*'], 'update:own': ['*'], 'delete:own': ['*'],
        },
        [RESOURCE_NAMES.CATEGORY]: {
            'create:own': ['*'], 'read:own': ['*'], 'update:own': ['*'], 'delete:own': ['*'],
        },
        [RESOURCE_NAMES.TAG]: {
            'create:own': ['*'], 'read:own': ['*'], 'update:own': ['*'], 'delete:own': ['*'],
        },
    },
    [ROLES_NAMES.GUEST]: {
        [RESOURCE_NAMES.ADS]: {
            'read:any': ['*'],
        },
        [RESOURCE_NAMES.CATEGORY]: {
            'read:own': ['*'],
        },
        [RESOURCE_NAMES.TAG]: {
            'read:own': ['*'],
        },
    },
};
module.exports = new AccessControl(grantsObject);
