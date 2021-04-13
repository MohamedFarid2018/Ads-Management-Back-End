const SALARY_TYPES_AR_ENUM = [
    {
        _id: "11",
        name: "شهرى ",

    },
    {
        _id: "22",
        name: "يومى",

    }];
const SALARY_TYPES_EN_ENUM = [
    {
        _id: "11",
        name: "monthly",

    },
    {
        _id: "22",
        name: "daily",

    }];

module.exports = {
    SALARY_TYPES_EN_ENUM,
    SALARY_TYPES_AR_ENUM,
    SALARY_TYPES_EN:{
        MONTHLY:SALARY_TYPES_EN_ENUM[0]._id,
        DAILY:SALARY_TYPES_EN_ENUM[1]._id

    }
}
;
