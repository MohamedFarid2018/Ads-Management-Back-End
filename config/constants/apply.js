const APPLY_STATUS_ENUM = ['received', 'good','accepted','rejected','interview'];
module.exports = {
    APPLY_STATUS_ENUM,
    APPLY_STATUS: {
        RECEIVED: APPLY_STATUS_ENUM[0],
        GOOD: APPLY_STATUS_ENUM[1],
        ACCEPTED: APPLY_STATUS_ENUM[2],
        REJECTED: APPLY_STATUS_ENUM[3],
        INTERVIEW: APPLY_STATUS_ENUM[4],
    },
 };
