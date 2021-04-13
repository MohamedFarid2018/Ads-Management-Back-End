const mobilyWs = require("mobily-ws");
const config = require("../../config");
const BaseNotification = require("./BaseNotification");
const client = mobilyWs(config.mobilyWs.apiKey, config.mobilyWs.name);

class Sms extends BaseNotification {
  async send(config) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(config);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
    const data = {
      username: config.smsMisr.username,
      password: config.smsMisr.password,
      language: config.smsMisr.language,
      sender: config.smsMisr.sender,
      mobile: [conf.to].join(","),
      message: conf.body,
    };
    return new Promise(
      (resolve, reject) =>
        axios
          .post(config.smsMisr.baseURLFromBody, data)
          .then((response) => {
            console.log("*********************");
            console.log(response);
            console.log("*********************");
          })
          .catch((error) => {
            console.log("---------------------");
            console.log(error);
            console.log("---------------------");
          })
      //   client
      //     .sendSMS(config.body, [config.to])
      //     .then((response) => {
      //         console.log('*********************');
      //         console.log(response);
      //         console.log('*********************');
      //     })
      //     .catch((error) => {
      //         console.log('---------------------');
      //         console.log(error);
      //         console.log('---------------------');
      //     })
    );
  }
}

module.exports = new Sms();
