module.exports = {
  app: {
    ios_version: 1,
    android_version: 1,
    version: "0.0.0",
    version_code: 102680,
    company_version_code: 103100,
    is_mandatory: true,
    name: "ads-management",
  },
  port: 3000,
  db: {
    url: `mongodb+srv://ads:thisIsPassword@cluster0.oardr.mongodb.net/ads?retryWrites=true&w=majority`,
  },
  cloudinary: {
    cloud_name: "dswejuv8l",
    apiKey: "964676795889565",
    appSecret: "s2vXmeIW5yKmFYVhZKAf4R6Clok",
  },
  storage: {
    accessKey: "",
    secretKey: "",
    baseUrl: "",
    bucket: "",
    region: "",
    folder: "",
  },
  auth: {
    local: {
      key:
        "ZAZDp1IxnPigN9gX4VgiuFl5hSlqSpFaa103S4JsWPGhIKzkMh6vmEiDUbolPeEcVYpN0tN1zkdRE2S3GeOd",
    },
  },
  NODE_ENV: "development",
  guest: {
    _id: "1",
    sub: "1",
    name: "Guest",
    roles: ["guest"],
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6Ikd1ZXN0Iiwicm9sZXMiOlsiZ3Vlc3QiXX0.ats4O6FJ8McALpnrNPxZnnPFmnMkU9C30IPgKnxX5p4",
  },
};
