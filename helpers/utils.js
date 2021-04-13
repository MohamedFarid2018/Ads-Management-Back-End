const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
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

    static getPath(base, file){
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

    static parseBoolean(text) {
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

    static toObjectId(id){
        return mongoose.Types.ObjectId(id);
    }
    static async parsePhoneNumber(phone, isInLogin = false) {
        let newPhone = phone;
        newPhone = await this.convertPhoneNumberToEnglish(newPhone);
        if(!String(newPhone).startsWith('+2') && !String(newPhone).startsWith('2')) newPhone = '+2' + newPhone;
        else if(String(newPhone).startsWith('2')) newPhone = '+' + newPhone;
        if (newPhone) {
            const phoneNumber = parsePhoneNumberFromString(newPhone);
            if (!phoneNumber) {
                if(isInLogin) throw new ValidationError(0, `please enter a valid email or phone number`, `الرجاء إدخال بريد إلكتروني أو رقم هاتف صالح`);
                throw new ValidationError(0, `this phone number is invalid`, 'رقم الهاتف هذا غير صالح');
            }
            else {
                if (!phoneNumber.isValid()) {
                    if(isInLogin) throw new ValidationError(0, `please enter a valid email or phone number`, 'الرجاء إدخال بريد إلكتروني أو رقم هاتف صالح');
                    throw new ValidationError(0, `this phone number is invalid`, 'رقم الهاتف هذا غير صالح');
                }
            }
        }
        // newPhone = newPhone.replace('+9660', '+966');
        newPhone = String(newPhone).split(' ').join('')
        newPhone = String(newPhone).split('-').join('')
        newPhone = String(newPhone).replace('+2', '')
        return newPhone;

    }

    static convertPhoneNumberToEnglish(phoneNumber) {
        let persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
        let arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
        for (let i = 0; i < 10; i++) {
            phoneNumber = phoneNumber.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
        return phoneNumber;


    }

}

module.exports = Utils;
