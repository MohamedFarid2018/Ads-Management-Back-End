const CURRENCY_TYPES_AR_ENUM = [
    {
        _id: "1",
        name: "دولار امريكى",

    },
    {
        _id: "2",
        name: "يورو",

    },
    {
        _id: "3",
        name: "ريال سعودى",

    },
    {
        _id: "4",
        name: "درهم اماراتى",

    },
    {
        _id: "5",
        name: "جنيه مصرى",
    },
    {
        _id: "6",
        name: "دينار كويتى",
    }


];
const CURRENCY_TYPES_EN_ENUM = [
    {
        _id: "1",
        name: "USD",

    },
    {
        _id: "2",
        name: "EUR",

    },
    {
        _id: "3",
        name: "SAR",

    },
    {
        _id: "4",
            name: "AED",

    },
    {
        _id: "5",
        name: "EGP",

    },
    {
        _id: "6",
        name: "KWD",

    }




];

module.exports = {
    CURRENCY_TYPES_AR_ENUM,
    CURRENCY_TYPES_EN_ENUM,
    CURRENCY_TYPES_EN:{
        DOLLAR:CURRENCY_TYPES_EN_ENUM[0]._id,
        EURO:CURRENCY_TYPES_EN_ENUM[1]._id,
        SAUDIA:CURRENCY_TYPES_EN_ENUM[2]._id,
        EMIRATES:CURRENCY_TYPES_EN_ENUM[3]._id,
        EGYPT:CURRENCY_TYPES_EN_ENUM[4]._id,
        KUWAIT:CURRENCY_TYPES_EN_ENUM[5]._id

    }
}
;
