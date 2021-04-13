const config = require('../config/config.prod');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.appSecret
});



module.exports= async function uploadImage(file)  {
    return new Promise((resolve, reject) => {
        try {
            if (!file) {
                reject(new Error("No Image file"));
            }
            const options = {
            };
            return cloudinary.uploader.upload_stream(options, (error, result) => {
                if (error) {
                    reject(new Error("Couldn't upload"));
                }
                resolve(result);
                console.log(result);
            }).end(file.data);
        } catch (err) {
            reject(err);
        }
    });
}
