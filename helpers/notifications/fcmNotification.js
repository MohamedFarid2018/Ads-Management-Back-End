const config = require("../../config");
const BaseNotification = require("./BaseNotification");
const FCM = require("fcm-node");
const fcm = new FCM(config.fcm.serverKey);
const { User } = require("../../db/models");
const adminAppServerFcm = new FCM(config.fcm.adminAppServerKey);

class fcmNotification extends BaseNotification {
  async send(notificationObj) {
    const user = await User.getOne({
      _id: notificationObj.notified,
      isArchived: false,
    });
    if (!user || (user && !user.fcmToken)){
      return;
    }
    let title =
      notificationObj.translation && notificationObj.translation.ar
        ? notificationObj.translation.ar.title
        : notificationObj.title;
    let body =
      notificationObj.translation && notificationObj.translation.ar
        ? notificationObj.translation.ar.message
        : notificationObj.message;
    const data = {
      notification: {
        title: title,
        body: body,
      },
      to: user.fcmToken,
      data: notificationObj.data,
    };
    console.log("************************************************");
    console.log(notificationObj.notifiedRole);
    console.log(data);
    console.log("************************************************");

    if (notificationObj.notifiedRole === "user") {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        fcm.send(data, (err, response) => {
          if (err) {
            console.log(err);
            console.log("Something has gone wrong with user fcm!");
          } else {
            console.log("Successfully sent for user with response: ", response);
          }
        });
    } 
    else {
        console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
        adminAppServerFcm.send(data, (err, response) => {
          if (err) {
            console.log(err);
            console.log("Something has gone wrong with shop admin!");
          } else {
            console.log("Successfully sent for admin app with response: ", response);
          }
        });
      }
  }
}

module.exports = new fcmNotification();
