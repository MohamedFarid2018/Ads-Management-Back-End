const JOB_TYPES_AR_ENUM = [
    {
        _id: "1",
        name: "دوام كامل",

    },
    {
        _id: "2",
        name: "دوام جزئى",

    },
    {
        _id: "3",
        name: "عمل مؤقت",

    }

];
const JOB_TYPES_EN_ENUM = [
    {
        _id: "1",
        name: "full time",

    },
    {
        _id: "2",
        name: "part time",

    },
    {
        _id: "3",
        name: "temporary job",

    }


];

module.exports = {
    JOB_TYPES_AR_ENUM,
    JOB_TYPES_EN_ENUM,
    JOB_TYPE_EN:{
        FULL_TIME:JOB_TYPES_EN_ENUM[0]._id,
        PART_TIME:JOB_TYPES_EN_ENUM[1]._id,
        TEMPORARY:JOB_TYPES_EN_ENUM[2]._id

    }
}
;
