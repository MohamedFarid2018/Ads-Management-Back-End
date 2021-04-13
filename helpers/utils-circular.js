const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const {Going} = require('../db/models/index');
const {parsePhoneNumberFromString} = require("libphonenumber-js");

const {
    ValidationError,
} = require('../helpers/errors/index');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class Utils {
    static inDevelopment() {
        const env = process.env.NODE_ENV || 'development';
        return (env === 'development');
    }

    static getPath(base, file) {
        return path.join(base, file);
    }

    static dirWalk(dir) {
        let results = [];
        const list = fs.readdirSync(dir);

        list.forEach((file) => {
            const fPath = `${dir}/${file}`;
            const stat = fs.statSync(fPath);

            if (stat && stat.isDirectory()) {
                results = results.concat(Utils.dirWalk(fPath));
            } else {
                results.push(fPath);
            }
        });

        return results;
    }

    static getDayString(timestamp) {
        const date = new Date(timestamp);
        const dayName = days[date.getDay()];

        return dayName.toLowerCase();
    }

    async parseBoolean(text) {
        if (_.isNil(text) || text.length === 0) {
            return false;
        }
        return (text.toLowerCase() === 'true');
    }

    static mapArrayToJsonByKey(array = [], key = undefined) {
        if (!array && !Array.isArray(array) && !key) {
            throw new Error('array and id are required');
        }
        const jsonObj = array.reduce((itemsObj, item) => {
            const nItemsObject = itemsObj;
            nItemsObject[item[key]] = item;
            return nItemsObject;
        }, {});
        return jsonObj;
    }

     toObjectId(id) {
        return mongoose.Types.ObjectId(id);
    }

     async validateMobileNumber(mobile) {
        const phoneNumber = parsePhoneNumberFromString(mobile);
        if (!phoneNumber)
            throw new ValidationError(0, `this phone number is invalid`);
        else {
            if (!phoneNumber.isValid())
                throw new ValidationError(0, `this phone number is invalid`);
        }
        return mobile;

    }

    // static async croneToNotifyUsers(eventId) {
    //     const event = await EventService.getEvent(eventId);
    //     const config = await ConfigurationService.get();
    //     const dateABeforeEvent = new Date(event.date.setHours(event.date.getHours() - config.activity_reminder));
    //      schedule.scheduleJob(dateABeforeEvent, async function(){
    //
    //     });
    // }

     async notifySynkersBeforeEventTime(event,hours) {
        const eventGoings = await Going.getAll({event:event._id},{},false);
        const {NOTIFICATION_TYPES}=require('../config/constants/notification');
        for(let i =0;i<eventGoings.length;i++){
            console.log(eventGoings[i].user);
            await require('../services/notification_processors/NotificationLocator').getNotificationProcessor(NOTIFICATION_TYPES.ACTIVITY_REMINDER).create(eventGoings[i].user, event,hours);

        }
        return ;
        // eventGoings.map(async (goings) => {
        // })

    }
     upperCaseFirstletter(str) {
        const splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

}

module.exports = new Utils ();
