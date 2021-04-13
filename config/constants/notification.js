const NOTIFICATION_TYPES_ENUM = ['sms_verification', 'new_message', 'new_rate', 'forget_password_sms_verification', 'new_notification', 'post_notification'];

module.exports = {
    NOTIFICATION_TYPES_ENUM,
    NOTIFICATION_TYPES: {
        SMS_VERIFICATION: NOTIFICATION_TYPES_ENUM[0],
        NEW_MESSAGE: NOTIFICATION_TYPES_ENUM[1],
        NEW_RATE: NOTIFICATION_TYPES_ENUM[2],
        FORGET_PASSWORD_SMS_VERIFICATION: NOTIFICATION_TYPES_ENUM[3],
        NEW_NOTIFICATION: NOTIFICATION_TYPES_ENUM[4],
        POST_NOTIFICATION: NOTIFICATION_TYPES_ENUM[5],
    },
}
;
